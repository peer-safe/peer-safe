import {
  getContract,
  toFunctionSelector,
  keccak256,
  toHex,
  toBytes,
  parseSignature,
  hexToNumber,
  createPublicClient,
  http,
} from "viem";
import { baseSepolia } from "viem/chains";
import { abi } from "./peerSafeDeployerAbi";
import assert from "assert";
import {
  createSmartAccountClient,
  ENTRYPOINT_ADDRESS_V06,
} from "permissionless";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { generatePrivateKey } from "viem/accounts";

const CONTRACT_ADDRESS = "0x4FFDE33f6bca791adca8D5194eC8C2934D251f54";
const RPC_URL =
  "https://api.developer.coinbase.com/rpc/v1/base-sepolia/NfZpgyPZbiQsPtBSEdZKa8rjBfxGtqyu";

// let walletClient: WalletClient;

// if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
//   // we are in the browser and metamask is running
//   // window.ethereum.request({ method: "eth_requestAccounts" });
//   // web3 = new Web3(window.ethereum);
//   walletClient = createWalletClient({
//     chain: baseSepolia,
//     transport: custom(window.ethereum),
//   });
// } else {
//   // we are on the server *OR* the user is not running metamask
//   // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
//   // const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/xxx_your_key_here_xxx");
//   // web3 = new Web3(provider);
//   walletClient = createWalletClient({
//     chain: baseSepolia,
//     transport: http(RPC_URL),
//   });
// }

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(
    "https://api.developer.coinbase.com/rpc/v1/base-sepolia/NfZpgyPZbiQsPtBSEdZKa8rjBfxGtqyu",
  ),
});

const cloudPaymater = createPimlicoPaymasterClient({
  chain: baseSepolia,
  transport: http(RPC_URL),
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});

async function getClient() {
  const simpleAccount = await privateKeyToSimpleSmartAccount(publicClient, {
    privateKey: generatePrivateKey(),
    factoryAddress: "0x9406Cc6185a346906296840746125a0E44976454",
    entryPoint: ENTRYPOINT_ADDRESS_V06,
  });
  const smartAccountClient = createSmartAccountClient({
    account: simpleAccount,
    chain: baseSepolia,
    bundlerTransport: http(RPC_URL),
    middleware: {
      sponsorUserOperation: cloudPaymater.sponsorUserOperation,
    },
  });
  return smartAccountClient;
}

export async function signMesssage(message: string) {
  const smartAccountClient = await getClient();

  const contract = getContract({
    address: CONTRACT_ADDRESS,
    abi,
    // client: { public: publicClient, wallet: walletClient },
    client: smartAccountClient,
  });
  const address = smartAccountClient.account.address;
  assert(address, "Address is undefined");

  toFunctionSelector("function ownerOf(uint256 tokenId)");
  const messageHash = keccak256(toHex(message));
  const messageHashBytes = toBytes(messageHash);

  const sig = await smartAccountClient.signMessage({
    account: address,
    message: messageHash,
  });

  const { r, s } = parseSignature(sig);
  const v = hexToNumber(`0x${sig.slice(130)}`);

  return { contract, messageHash, messageHashBytes, v, r, s, address };
}

export async function getAddress() {
  const smartAccountClient = await getClient();
  const address = smartAccountClient.account.address;
  const contract = getContract({
    address: CONTRACT_ADDRESS,
    abi,
    // client: { public: publicClient, wallet: walletClient },
    client: smartAccountClient,
  });
  return { address, contract };
}
