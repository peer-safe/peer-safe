import { type Web3Auth } from "@web3auth/modal";
import { Link } from "@tanstack/react-location";

const Navbar = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  return (
    <div className="top-0 z-20 flex w-full justify-center">
      <div className="flex max-w-5xl flex-1 items-center p-5">
        <div className="lg:hidden flex items-center gap-2">
          <Link to={"/"}>
            <img
              src={require("../../assets/logo-green.svg").default}
              className="aspect-square min-h-[3rem]"
              alt="logo"
            ></img>
          </Link>
          <span className="rounded-full bg-zinc-700 px-2 py-[2px] text-sm text-gray-300">
            alpha
          </span>
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
};

export default Navbar;
