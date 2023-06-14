import { ButtonLogout, ButtonLogin } from "./ButtonsAuth";
import { useContext } from "react";
import { UserContext } from "../utils/globalContext";
import { type Web3Auth } from "@web3auth/modal";
import { Link } from "@tanstack/react-location";

const authButtonStyle = "py-2 px-4 transition-all ease-in-out bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 rounded-full flex items-center disabled:cursor-wait";

const Navbar = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const { userContext } = useContext(UserContext)!;
  return (
    <div className="flex items-center">
      <Link to={"/"}>
        <img
          src={require("../assets/logo-green.svg").default}
          height={48}
          width={48}
          alt="logo"
        ></img>
      </Link>
      <span className="ml-2 rounded-full bg-zinc-600 px-2 text-gray-400">
        alpha
      </span>
      <div className="flex-1" />
      <div className="flex items-center gap-8">
        {!userContext ? (
          <ButtonLogin web3Auth={web3Auth} className={authButtonStyle} />
        ) : (
          <ButtonLogout web3Auth={web3Auth} className={authButtonStyle} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
