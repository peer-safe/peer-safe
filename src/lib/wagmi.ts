import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { type Chain } from "wagmi/chains";
import { webSocket, createConfig, createStorage, cookieStorage } from "wagmi";
import { polygonAmoy } from "wagmi/chains";

type LOGIN_PROVIDERS =
  | "google"
  | "facebook"
  | "reddit"
  | "discord"
  | "twitch"
  | "apple"
  | "line"
  | "github"
  | "kakao"
  | "linkedin"
  | "twitter"
  | "weibo"
  | "wechat"
  | "email_passwordless"
  | "sms_passwordless"
  | "jwt";

const name = "Peersafe";
const iconUrl = "/logo192.png"; // change this

const clientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID!;

function Web3AuthConnectorInstance(chains: Chain[], provider: LOGIN_PROVIDERS) {
  if (!chains[0]) throw new Error("No chain provided");

  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    // This is the public RPC we have added, please pass on your own endpoint while creating an app
    rpcTarget: chains[0].rpcUrls.default.http[0]!,
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorerUrl: chains[0].blockExplorers?.default.url[0],
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3AuthInstance = new Web3AuthNoModal({
    clientId,
    privateKeyProvider,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // change this
  });

  // Add openlogin adapter for customizations
  const openloginAdapterInstance = new OpenloginAdapter({
    adapterSettings: {
      network: "cyan",
      uxMode: UX_MODE.REDIRECT,
      whiteLabel: {
        appName: name,
        logoLight: iconUrl,
        logoDark: iconUrl,
        defaultLanguage: "en",
        mode: "dark",
      },
    },
  });

  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  return Web3AuthConnector({
    web3AuthInstance,
    loginParams: {
      loginProvider: provider,
    },
  });
}

const googleConnector = Web3AuthConnectorInstance([polygonAmoy], "google");
const githubConnector = Web3AuthConnectorInstance([polygonAmoy], "github");
const discordConnector = Web3AuthConnectorInstance([polygonAmoy], "discord");
const emailConnector = Web3AuthConnectorInstance(
  [polygonAmoy],
  "email_passwordless",
);

export const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  connectors: [
    googleConnector,
    githubConnector,
    discordConnector,
    emailConnector,
  ],
  transports: {
    [polygonAmoy.id]: webSocket(), // put alchemy websocket url here
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
