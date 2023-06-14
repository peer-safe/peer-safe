import { ButtonLogout, ButtonLogin } from "./ButtonsAuth";
import { useContext } from "react";
import { UserContext } from "../utils/globalContext";
import BaseButton from "./BaseButton";
import { type Web3Auth } from "@web3auth/modal";
import { Link } from "@tanstack/react-location";

const Navbar = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const { userContext } = useContext(UserContext)!;
  return (
    <div className="flex items-center">
      <Link to={"/"}>
        <img
          src={require("../assets/logo.svg").default}
          height={48}
          width={48}
          alt="logo"
        ></img>
      </Link>
      <span className="ml-2 rounded-full bg-zinc-600 px-2 text-teal-100">
        alpha
      </span>
      <div className="flex-1" />
      <div className="flex items-center gap-8">
        <BaseButton
          className="hover:text-gray-400"
          onClick={() => {
            window.open(
              "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              "_blank"
            );
          }}
        >
          about
        </BaseButton>
        {!userContext ? (
          <ButtonLogin web3Auth={web3Auth} />
        ) : (
          <ButtonLogout web3Auth={web3Auth} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
