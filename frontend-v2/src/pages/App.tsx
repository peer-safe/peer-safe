import Navbar from "../components/app/Navbar";
import type { Web3Auth } from "@web3auth/modal";
import Sidebar from "../components/app/Sidebar";
import { useContext, useEffect } from "react";
import { UserContext } from "../utils/globalContext";
import { Navigate, Outlet, useNavigate } from "@tanstack/react-location";
import { deployVault, getVaultAddress } from "../services/peerSafeDeployer";
import toast from "react-hot-toast";

const App = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const navigate = useNavigate();
  const { userContext, setUserContext } = useContext(UserContext)!;
  const provider = web3Auth.provider;

  useEffect(() => {
    if (!userContext!.vaultAddress.length) {
      deployVault(provider!)
        .then(async () => {
          const vaultAddress = await getVaultAddress(provider!);
          setUserContext((prevState) => {
            return { ...prevState!, vaultAddress };
          });
        })
        .catch((e) => {
          if (userContext!.vaultAddress) return;
          // react strictmode calls everything twice, so sometimes this might
          // error on localhost even if there's no error on the server
          // due to request-response mismatch
          console.error("Error deploying vault:", e);
          toast.error(`Error deploying vault`);
          navigate({ to: "/" });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // typescript not smart enough to know that userContext and provider
  // cannot be null as the router will not route this page if they are
  if (!userContext || !provider) {
    console.error("This should not be possible:", userContext, provider);
    return <Navigate to="/" />;
  }

  return (
    <div className="relative min-w-[18rem] flex h-screen w-full gap-4 bg-black p-4 overflow-hidden">
      <Sidebar web3Auth={web3Auth} />
      <div className="z-10 flex min-w-[340px] flex-1 flex-col overflow-y-scroll rounded-xl bg-[#101010] p-4">
        <Navbar web3Auth={web3Auth}  userContext={userContext} />
        {!userContext.vaultAddress.length ? (
          <span className="flex-1 self-center">
            Please wait while we create your vault
          </span>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default App;
