import { Web3Auth } from "@web3auth/modal";
import { Connector, useConnect, useDisconnect } from "wagmi";
import { getPrivateKey, getUserInfo } from "../services/web3Auth";
import {
  UserContext,
  AuthContext,
  UserContextTypeInner,
} from "../utils/globalContext";
import { useContext } from "react";
import { getVaultAddress } from "../services/peerSafeDeployer";
import BaseButton from "./BaseButton";

export const appLogin = async (
  web3Auth: Web3Auth,
  setUserContext: React.Dispatch<
    React.SetStateAction<UserContextTypeInner | null>
  >,
  connectAsync: ReturnType<typeof useConnect>["connectAsync"],
  connector: Connector
) => {
  try {
    const res = await connectAsync({ connector });
    const account = res.account;
    const chain = res.chain;
    const userInfo = await getUserInfo(web3Auth);
    const privateKey = await getPrivateKey(web3Auth.provider!);
    const vaultAddress = await getVaultAddress(web3Auth.provider!);
    setUserContext({
      userInfo,
      privateKey,
      vaultAddress,
      account,
      chain,
    });
  } catch (err) {
    web3Auth.loginModal.closeModal();
    throw new Error(`Failed to log in: ${err}`);
  }
};

export const ButtonLogout = ({
  web3Auth,
  children,
  className,
}: {
  web3Auth: Web3Auth;
  children?: JSX.Element;
  className?: string;
}) => {
  const { setUserContext } = useContext(UserContext)!;
  const { disconnectAsync } = useDisconnect();
  const { isDisconnecting, setIsDisconnecting } = useContext(AuthContext)!;

  return (
    <BaseButton
      className={className || ""}
      onClick={async () => {
        setIsDisconnecting(true);
        localStorage.removeItem("wagmi.connected");
        await disconnectAsync();
        setUserContext(null);
        setIsDisconnecting(false);
      }}
      disabled={isDisconnecting}
    >
      {children || "Logout"}
    </BaseButton>
  );
};

export const ButtonLogin = ({
  web3Auth,
  children,
  className,
  onSuccess,
  onError,
}: {
  web3Auth: Web3Auth;
  children?: JSX.Element;
  className?: string;
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const { setUserContext } = useContext(UserContext)!;
  const { connectAsync, connectors } = useConnect();
  const { isConnecting, setIsConnecting } = useContext(AuthContext)!;
  return (
    <div className="flex items-start gap-2">
      {connectors.map((connector) => (
        <BaseButton
          className={className || ""}
          disabled={isConnecting || !connector.ready}
          key={connector.id}
          onClick={() => {
            setIsConnecting(true);
            appLogin(web3Auth, setUserContext, connectAsync, connector)
              .then(() => onSuccess?.())
              .catch((e) => onError?.(e))
              .finally(() => setIsConnecting(false));
          }}
        >
          {children || "Login"}
        </BaseButton>
      ))}
    </div>
  );
};
