import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Web3AuthConnectorInstance from "./utils/Web3AuthConnectorInstance";
import { Toaster } from "react-hot-toast";
const toastOptions = {
  error: {
    duration: 2200,
    className: "z-80",
    style: {
      background: "#302420",
      border: "1px solid red",
      color: "#efefef",
    },
  },
  success: {
    duration: 2200,
    className: "z-80",
    style: {
      background: "#202C30",
      border: "1px solid green",
      color: "#efefef",
    },
  },
};

// Configure chains & providers with the Public provider.
const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY!;
const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey }), publicProvider()]
);

const { web3AuthConnector, web3AuthInstance } =
  Web3AuthConnectorInstance(chains);

const client = createClient({
  autoConnect: true,
  connectors: [web3AuthConnector],
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <Toaster
        containerClassName="toaster-container"
        toastOptions={toastOptions}
      />
      <App web3Auth={web3AuthInstance} />
    </WagmiConfig>
  </React.StrictMode>
);
