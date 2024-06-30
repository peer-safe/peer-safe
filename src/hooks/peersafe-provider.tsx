import React from "react";

type ContextType = {
  example: () => number;
  someOther: () => string;
};

const Context = React.createContext<ContextType | undefined>(undefined);
const { Provider } = Context;

export const usePeersafe = () => React.useContext(Context)!;

export default function PeerSafeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function example() {
    return 1;
  }
  function someOther() {
    return "Someothervalue";
  }

  return <Provider value={{ example, someOther }}>{children}</Provider>;
}
