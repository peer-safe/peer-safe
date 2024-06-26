import { signMesssage, getAddress } from "~/lib/peer-safe";
import axios from "axios";
import { type Address } from "viem";
import { baseSepolia } from "viem/chains";

const API_URL = "https://relayer.peersafe.tech/";
// export type MyFile = {
//   _fileType: string;
//   _ipfsHash: string;
//   _key: string;
//   _name: string;
//   _sharedBy: `0x${string}`;
// };

export async function getAllFiles() {
  const { contract, messageHash, v, r, s } =
    await signMesssage("i want my files");
  const files = await contract.read.getAllFiles([messageHash, v, r, s]);
  return files;
}

export async function deleteFile(ipfsHash: string) {
  const { messageHash, v, r, s } = await signMesssage("i delete");
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
  // const hash = contract.write.deleteFile([messageHash, v, r, s, ipfsHash]);
}

export async function getVaultAddress() {
  const { address, contract } = await getAddress();
  try {
    const vaultAddress: string = await contract.read.getVault([address]);
    return vaultAddress;
  } catch (_error) {
    console.log("vault not deployed yet");
  }
}

export async function deployContract() {
  const { contract, messageHash, v, r, s } =
    await signMesssage("i deploy contract");
  const { address } = await getAddress();
  const hash = await contract.write.deploy([address, messageHash, v, r, s], {
    account: address,
    chain: baseSepolia,
  });
  // const data = {
  //   action: "deploy",
  //   messageHash,
  //   r,
  //   s,
  //   v,
  // };
  // await axios.post(API_URL, data, {
  //   timeout: 24000,
  // });
}

export async function deployFile(
  name: string,
  fileType: string,
  fileHash: string,
  keyHash: string,
) {
  const { messageHash, v, r, s } = await signMesssage("i deploy file");

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
}

export async function getPubKey(address: string) {
  const { contract } = await signMesssage("gib pub key");
  const pubKey = await contract.read.getPubKey([address as Address]);
  return pubKey;
}
