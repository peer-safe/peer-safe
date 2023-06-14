import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";

export const getPrivateKey = async (provider: SafeEventEmitterProvider) => {
  const privateKey = await provider.request({
    method: "eth_private_key",
  });
  return privateKey as string;
};

export const getChainId = async (provider: SafeEventEmitterProvider) => {
  // const rpc = new ethers(provider);
  const rpc = new ethers.providers.Web3Provider(provider);
  const chainId = (await rpc.getNetwork()).chainId;
  console.log("Chain ID: ", chainId);
};

export const getAccounts = async (provider: SafeEventEmitterProvider) => {
  const rpc = new ethers.providers.Web3Provider(provider);
  const signer = await rpc.getSigner();
  const address = await signer.getAddress();
  console.log("Address: ", address);
};

export const getUserInfo = async (web3auth: Web3Auth) => {
  const user = await web3auth.getUserInfo();
  return user;
};
