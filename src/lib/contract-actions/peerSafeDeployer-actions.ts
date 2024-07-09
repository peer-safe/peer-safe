import { contract, useAddress, useCustomSignMessage } from "~/lib/peer-safe";
import axios from "axios";
import { type Address } from "viem";

const API_URL = "https://relayer.peersafe.tech/";

export async function useAllFiles() {
  const signMesage = useCustomSignMessage();
  const { messageHash, v, r, s } = await signMesage("i want my files");
  const files = await contract.read.getAllFiles([messageHash!, v!, r!, s!]);
  return files;
}

export async function useDeleteFile(ipfsHash: string) {
  const signMesage = useCustomSignMessage();
  const { messageHash, v, r, s } = await signMesage("i delete");
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

export function useVaultAddress() {
  const userAddy = useAddress();
  return async function getVaultAddress() {
    try {
      const vaultAddress: string = await contract.read.getVault([userAddy]);
      return vaultAddress;
    } catch (_error) {
      console.log("vault not deployed yet");
    }
  };
}

export function useDeployContract() {
  const signMesage = useCustomSignMessage();
  return async function deployContract(pubKey: `0x${string}`) {
    signMesage("i deploy contract").then(async ({ messageHash, v, r, s }) => {
      const data = {
        action: "deploy",
        messageHash,
        r,
        s,
        v: Number(v),
        pubKey,
      };
      console.log(data);
      return await axios.post(API_URL, data, {
        timeout: 24000,
      });
    });
    // const hash = contract.write.deploy([messageHash, r, s, v]);
  };
}

export async function useDeployFile(
  name: string,
  fileType: string,
  fileHash: string,
  keyHash: string,
) {
  const signMesage = useCustomSignMessage();
  const { messageHash, v, r, s } = await signMesage("i deploy file");

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

export async function usePubKey(address: string) {
  // const { contract } = await useCustomSignMessage("gib pub key");
  const pubKey = await contract.read.getPubKey([address as Address]);
  return pubKey;
}
