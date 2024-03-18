import {
  Outlet,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import Home from "./pages/Home";
import type { Web3Auth } from "@web3auth/modal";
import "./index.css";
import { useConnect } from "wagmi";

const location = new ReactLocation();

const App = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const { connectAsync, connectors } = useConnect();

  return (
    <Router
      location={location}
      routes={[
        {
          path: "/",
          element: <Home web3Auth={web3Auth} />,
        },
      ]}
    >
          <Outlet /> {/* Start rendering router matches */}
    </Router>
  );
};

export default App;
