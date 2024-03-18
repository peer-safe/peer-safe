import { type Web3Auth } from "@web3auth/modal";
import { Link } from "@tanstack/react-location";
import BaseButton from "./../BaseButton";

const navButtonStyle =
  "py-2 px-4 whitespace-nowrap  transition-all ease-in-out duration-300 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 rounded-full flex items-center disabled:cursor-wait";

const Navbar = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  return (
    <div className="top-0 z-20 flex w-full justify-center">
      <div className="flex max-w-5xl flex-1 items-center p-5">
        <Link to={"/"} className="shrink-0">
          <img
            src={require("../../assets/logo-green.svg").default}
            className="aspect-square h-12"
            alt="logo"
          ></img>
        </Link>
        <span className="ml-2 rounded-full bg-zinc-700 px-2 text-sm text-gray-400">
          alpha
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
            <BaseButton className={navButtonStyle}>waww</BaseButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
