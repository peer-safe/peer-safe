import { ethers } from "ethers";
import abi from "../utils/abi";
import type { SafeEventEmitterProvider } from "@web3auth/base";
import axios from "axios";

const API_URL = "https://relayer.peersafe.tech/";
const CONTRACT_ADDRESS = "0xB97950EF94A5D2B0948D9E841ecB2594E62cc7B3";

export type MyFile = {
  _fileType: string;
  _ipfsHash: string;
  _key: string;
  _name: string;
};

const signMessage = async (
  provider: SafeEventEmitterProvider,
  message?: string,
  addy?: boolean
) => {
  const rpc = new ethers.providers.Web3Provider(provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, rpc);
  const signer = rpc.getSigner();

  if (addy) {
    const userAddy = await signer.getAddress();
    return { userAddy, contract };
  }

  const messageHash = ethers.utils.id(message || "no message provided");
  const messageHashBytes = ethers.utils.arrayify(messageHash);

  const sig = await signer.signMessage(messageHashBytes);
  const recovered = ethers.utils.splitSignature(sig);
  const r = recovered.r;
  const s = recovered.s;
  const v = recovered.v;

  return { contract, messageHash, messageHashBytes, v, r, s };
};

export const getAllFiles = async (provider: SafeEventEmitterProvider) => {
  const { contract, messageHashBytes, v, r, s } = await signMessage(
    provider,
    "i want my files"
  );
  const files: MyFile[] = await contract.getAllFiles(messageHashBytes, v, r, s);
  return files;
};

export const deleteFile = async (
  provider: SafeEventEmitterProvider,
  ipfsHash: string
) => {
  const { messageHash, v, r, s } = await signMessage(provider, "i delete");
  const body = {
    action: "deleteFile",
    messageHash,
    r,
    s,
    v,
    ipfsHash,
  };
  await axios.post(API_URL, body, {
    timeout: 24000,
  });
};

export const getVaultAddress = async (provider: SafeEventEmitterProvider) => {
  const { userAddy, contract } = await signMessage(provider, undefined, true);
  try {
    const vaultAddress: string = await contract.getVault(userAddy);
    console.log("vault address: ", vaultAddress);
    return vaultAddress;
  } catch (_error) {
    console.log("vault not deployed yet");
    return "";
  }
};

export const deployVault = async (provider: SafeEventEmitterProvider) => {
  const { messageHash, v, r, s } = await signMessage(
    provider,
    "i deploy contract"
  );

  // request server to deploy with messageHash, r, s, v
  const data = {
    action: "deploy",
    messageHash,
    r,
    s,
    v,
  };
  await axios.post(API_URL, data, {
    timeout: 24000,
  });
};

export const deployFile = async (
  name: string,
  fileType: string,
  fileHash: string,
  keyHash: string,
  provider: SafeEventEmitterProvider
) => {
  const { messageHash, v, r, s } = await signMessage(provider, "i deploy file");

  const body = {
    action: "createFile",
    messageHash,
    r,
    s,
    v,
    name,
    fileType,
    ipfsHash: fileHash,
    key: keyHash,
  };

  try {
    const response = await axios.post(API_URL, body, {
      timeout: 24000,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};
