import {
  getContract,
  createWalletClient,
  custom,
  toFunctionSelector,
  keccak256,
  toHex,
  toBytes,
  parseSignature,
  hexToNumber,
} from "viem";
import { baseSepolia } from "viem/chains";
import { abi } from "./abi";
import assert from "assert";

const CONTRACT_ADDRESS = "0x4FFDE33f6bca791adca8D5194eC8C2934D251f54";

export const client = createWalletClient({
  chain: baseSepolia,
  transport: custom(window.ethereum),
});

export const contract = getContract({
  address: CONTRACT_ADDRESS,
  abi,
  client,
});

export async function getAddress() {
  const [address] = await client.getAddresses();
  assert(address, "Address is undefined");
  return address;
}

export async function signMesssage(message: string) {
  const address = await getAddress();

  toFunctionSelector("function ownerOf(uint256 tokenId)");
  const messageHash = keccak256(toHex(message));
  const messageHashBytes = toBytes(messageHash);

  const sig = await client.signMessage({
    account: address,
    message: messageHash,
  });

  const { r, s } = parseSignature(sig);
  const v = hexToNumber(`0x${sig.slice(130)}`);

  return { contract, messageHash, messageHashBytes, v, r, s };
}
