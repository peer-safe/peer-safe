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
  http,
  type WalletClient,
} from "viem";
import { baseSepolia } from "viem/chains";
import { abi } from "./peerSafeDeployerAbi";
import assert from "assert";

const CONTRACT_ADDRESS = "0x4FFDE33f6bca791adca8D5194eC8C2934D251f54";

let walletClient: WalletClient;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and metamask is running
  // window.ethereum.request({ method: "eth_requestAccounts" });
  // web3 = new Web3(window.ethereum);
  walletClient = createWalletClient({
    chain: baseSepolia,
    transport: custom(window.ethereum),
  });
} else {
  // we are on the server *OR* the user is not running metamask
  // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
  // const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/xxx_your_key_here_xxx");
  // web3 = new Web3(provider);
  walletClient = createWalletClient({
    chain: baseSepolia,
    transport: http(
      "https://api.developer.coinbase.com/rpc/v1/base-sepolia/NfZpgyPZbiQsPtBSEdZKa8rjBfxGtqyu",
    ),
  });
}

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(
    "https://api.developer.coinbase.com/rpc/v1/base-sepolia/NfZpgyPZbiQsPtBSEdZKa8rjBfxGtqyu",
  ),
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

export async function getAddy() {
  const userAddy = await getAddress();
  return { userAddy, contract };
}
