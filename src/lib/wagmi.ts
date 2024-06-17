import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { type Chain } from "wagmi/chains";
import { type CreateConfigParameters } from "wagmi";
import { webSocket, createConfig, createStorage, cookieStorage } from "wagmi";
import { baseSepolia } from "wagmi/chains";

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

function createWeb3AuthInstances(
  chain: Chain,
  providers: LOGIN_PROVIDERS[],
  extraParams: { login_hint?: string } = {},
) {
  if (!chain) throw new Error("No chain provided");

  const web3AuthInstance = new Web3AuthNoModal({
    clientId,
    privateKeyProvider: new EthereumPrivateKeyProvider({
      config: {
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x" + chain.id.toString(16),
          // This is the public RPC we have added, please pass on your own endpoint while creating an app
          rpcTarget: chain.rpcUrls.default.http[0]!,
          displayName: chain.name,
          tickerName: chain.nativeCurrency?.name,
          ticker: chain.nativeCurrency?.symbol,
          blockExplorerUrl: chain.blockExplorers?.default.url[0],
        },
      },
    }),
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // change this
  });

  web3AuthInstance.configureAdapter(
    new OpenloginAdapter({
      adapterSettings: {
        network: "sapphire_devnet",
        uxMode: UX_MODE.REDIRECT,
        whiteLabel: {
          appName: name,
          logoLight: iconUrl,
          logoDark: iconUrl,
          defaultLanguage: "en",
          mode: "dark",
        },
      },
    }),
  );

  return providers.map((provider) =>
    Web3AuthConnector({
      web3AuthInstance,
      loginParams: {
        loginProvider: provider,
        extraLoginOptions: extraParams,
      },
    }),
  );
}

export const socialProviders: LOGIN_PROVIDERS[] = [
  "google",
  "github",
  "discord",
];

const socialConnectors = createWeb3AuthInstances(baseSepolia, socialProviders);

const commonConfig: CreateConfigParameters<
  readonly [Chain, ...Chain[]],
  Record<number, ReturnType<typeof webSocket>>
> = {
  chains: [baseSepolia],
  connectors: socialConnectors,
  transports: {
    [baseSepolia.id]: webSocket(), // put alchemy websocket url here
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
};

export const wagmiConfig = createConfig(commonConfig);

export const emailWagmiConfig = (email: string) =>
  createConfig({
    ...commonConfig,
    connectors: createWeb3AuthInstances(baseSepolia, ["email_passwordless"], {
      login_hint: email,
    }),
  });

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
