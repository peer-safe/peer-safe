import {
  Navigate,
  Outlet,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import Home from "./pages/Home";
import AppPage from "./pages/App";
import MyVault from "./pages/App/MyVault";
import type { Web3Auth } from "@web3auth/modal";
import "./index.css";
import { useEffect, useState } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";
import {
  UserContextTypeInner,
  UserContext,
  AuthContext,
} from "./utils/globalContext";
import { toast } from "react-hot-toast";
import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
import { appLogin } from "./components/ButtonsAuth";
import FullScreenLoading from "./pages/FullScreenLoading";
import { useConnect } from "wagmi";

const location = new ReactLocation();

const App = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const [userContext, setUserContext] = useState<UserContextTypeInner | null>(
    null
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [wasWagmiConnected, setWasWagmiConnected] = useState<boolean>(
    JSON.parse(`${localStorage.getItem("wagmi.connected")}`) || false
  );
  const { connectAsync, connectors } = useConnect();

  useEffect(() => {
    console.log("is wagmi localstorage:", wasWagmiConnected);

    const modalListener = (visible: boolean) => {
      if (!visible) setIsConnecting(false);
      else {
        if (wasWagmiConnected) {
          toast.error("Session expired, please sign in again");
          setWasWagmiConnected(false);
        }
      }
    };
    web3Auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, modalListener);

    if (wasWagmiConnected) {
      localStorage.removeItem("wagmi.connected");
      appLogin(web3Auth, setUserContext, connectAsync, connectors[0])
        .then()
        .catch((e) => {
          console.error(e);
          toast.error("Error logging in");
        })
        .finally(() => {
          setWasWagmiConnected(false);
        });
    }

    return () =>
      void web3Auth.off(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, modalListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return wasWagmiConnected ? (
    <FullScreenLoading />
  ) : (
    <Router
      location={location}
      routes={[
        {
          path: "/",
          element: <Home web3Auth={web3Auth} />,
        },
        {
          id: "app",
          element: (
            <ProtectedRoute>
              <AppPage web3Auth={web3Auth} />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "/*",
              element: <MyVault web3Auth={web3Auth} />
            }
          ]
        },
        {
          path: "/*",
          element: <Navigate to="/" />,
        },
      ]}
    >
      <AuthContext.Provider
        value={{
          isConnecting,
          setIsConnecting,
          isDisconnecting,
          setIsDisconnecting,
        }}
      >
        <UserContext.Provider value={{ userContext, setUserContext }}>
          <Outlet /> {/* Start rendering router matches */}
        </UserContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
