import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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

const CONTRACT_ADDRESS = "0x4FFDE33f6bca791adca8D5194eC8C2934D251f54";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(a: number, b = 2) {
  if (!a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]}`;
}

export async function signMesssage(message: string, addy?: boolean) {
  const client = createWalletClient({
    chain: baseSepolia,
    transport: custom(window.ethereum),
  });
  const contract = getContract({
    address: CONTRACT_ADDRESS,
    abi,
    client,
  });
  const [address] = await client.getAddresses();
  if (addy) {
    return { address, contract };
  }

  toFunctionSelector("function ownerOf(uint256 tokenId)");
  const messageHash = keccak256(toHex(message));
  const messageHashBytes = toBytes(messageHash);

  const sig = await client.signMessage({
    account: address!,
    message: messageHash,
  });

  const { r, s } = parseSignature(sig);
  const v = hexToNumber(`0x${sig.slice(130)}`);

  return { contract, messageHash, messageHashBytes, v, r, s };
}
