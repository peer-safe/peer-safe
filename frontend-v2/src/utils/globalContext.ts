import { UserInfo } from "@web3auth/base";
import { Dispatch, SetStateAction, createContext } from "react";

export type UserContextType = {
  userContext: UserContextTypeInner | null;
  setUserContext: Dispatch<SetStateAction<UserContextTypeInner | null>>;
};
export type UserContextTypeInner = {
  userInfo: Partial<UserInfo>;
  privateKey: string;
  vaultAddress: string;
  account: `0x${string}`;
  chain: {
    id: number;
    unsupported: boolean;
  };
};
export const UserContext = createContext<UserContextType | null>(null);

export type AuthContextType = {
  isConnecting: boolean;
  setIsConnecting: Dispatch<SetStateAction<boolean>>;
  isDisconnecting: boolean;
  setIsDisconnecting: Dispatch<SetStateAction<boolean>>;
};
export const AuthContext = createContext<AuthContextType | null>(null);
