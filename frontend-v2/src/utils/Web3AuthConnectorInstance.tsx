// Web3Auth Libraries
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Chain } from "wagmi";
const logo = require("../assets/logo-green.svg").default;

let clientId = process.env.REACT_APP_WEB3_AUTH_CLIENT_ID!;

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  const name = "PeerSafe";
  const web3AuthInstance = new Web3Auth({
    clientId,
    authMode: "WALLET",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x" + chains[0].id.toString(16),
      rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
      displayName: chains[0].name,
      tickerName: chains[0].nativeCurrency?.name,
      ticker: chains[0].nativeCurrency?.symbol,
    },
    uiConfig: {
      appName: name,
      theme: "dark",
      loginMethodsOrder: ["google", "github", "discord", "twitter"],
      defaultLanguage: "en",
      appLogo: logo,
      modalZIndex: "60",
    },
  });

  // Add openlogin adapter for customizations
  const openloginAdapterInstance = new OpenloginAdapter({
    loginSettings: {
      mfaLevel: "default",
    },
    adapterSettings: {
      network: "cyan",
      uxMode: "popup",
      whiteLabel: {
        name: "PeerSafe",
        logoLight: logo,
        logoDark: logo,
        defaultLanguage: "en",
        dark: true,
      },
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);
  const web3AuthConnector = new Web3AuthConnector({
    chains: chains,
    options: {
      web3AuthInstance,
    },
  });
  return { web3AuthInstance, web3AuthConnector };
}
