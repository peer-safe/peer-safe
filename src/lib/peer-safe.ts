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
  createPublicClient,
  webSocket,
} from "viem";
import { baseSepolia } from "viem/chains";
import { abi } from "./peerSafeDeployerAbi";
import assert from "assert";

const CONTRACT_ADDRESS = "0x4FFDE33f6bca791adca8D5194eC8C2934D251f54";

export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: custom(window.ethereum),
});

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: webSocket(),
});

export const contract = getContract({
  address: CONTRACT_ADDRESS,
  abi,
  client: { public: publicClient, wallet: walletClient },
});

export async function getAddress() {
  const [address] = await walletClient.getAddresses();
  assert(address, "Address is undefined");
  return address;
}

export async function signMesssage(message: string) {
  const address = await getAddress();

  toFunctionSelector("function ownerOf(uint256 tokenId)");
  const messageHash = keccak256(toHex(message));
  const messageHashBytes = toBytes(messageHash);

  const sig = await walletClient.signMessage({
    account: address,
    message: messageHash,
  });

  const { r, s } = parseSignature(sig);
  const v = hexToNumber(`0x${sig.slice(130)}`);

  return { contract, messageHash, messageHashBytes, v, r, s };
}
