import {
  getContract,
  createWalletClient,
  custom,
  createPublicClient,
  http,
  keccak256,
  toHex,
  parseSignature,
  hexToNumber,
} from "viem";
import { baseSepolia } from "viem/chains";
import { abi } from "./peerSafeDeployerAbi";
import assert from "assert";
import { useAccount, useSignMessage } from "wagmi";

// const CONTRACT_ADDRESS = "0x4FFDE33f6bca791adca8D5194eC8C2934D251f54";
const CONTRACT_ADDRESS = "0x82F900369CEa4FEED9006FA4ba82af705f616934";
const RPC_URL =
  "https://api.developer.coinbase.com/rpc/v1/base-sepolia/NfZpgyPZbiQsPtBSEdZKa8rjBfxGtqyu";

export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: custom(window.ethereum),
});

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(RPC_URL),
});

export const contract = getContract({
  address: CONTRACT_ADDRESS,
  abi,
  client: { public: publicClient, wallet: walletClient },
});

export function useAddress() {
  const { address } = useAccount();
  assert(address, "Address is undefined");
  return address;
}

export function useCustomSignMessage() {
  const { signMessageAsync: signMessage } = useSignMessage();
  const signer = {
    signMesage: async (message: string) => {
      const messageHash = keccak256(toHex(message));
      const data = await signMessage({ message: message });
      const { r, s } = parseSignature(data);
      const v = hexToNumber(`0x${data.slice(130)}`);

      return { messageHash, v, r, s };
    },
  };

  return signer;
}

// export async function signMesssage(message: string) {
//   const address = await useAddress();

//   toFunctionSelector("function ownerOf(uint256 tokenId)");
//   const messageHash = keccak256(toHex(message));
//   const messageHashBytes = toBytes(messageHash);

//   const sig = await walletClient.signMessage({
//     account: address,
//     message: messageHash,
//   });

//   const { r, s } = parseSignature(sig);
//   const v = hexToNumber(`0x${sig.slice(130)}`);

//   return { contract, messageHash, messageHashBytes, v, r, s };
// }
