import { Link } from "@tanstack/react-location";
import { ButtonLogout } from "../ButtonsAuth";
import { Web3Auth } from "@web3auth/modal";

const buttonStyle = "pl-6 py-4 flex items-center gap-8 bg-zinc-700 rounded-lg";
const Sidebar = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  return (
    <div className="left-0 top-0 flex max-lg:absolute max-lg:w-screen h-screen max-lg:hidden lg:sticky lg:w-72">
      <div className="flex w-full max-w-[18rem] flex-col justify-between bg-zinc-800 p-5">
        <div className={"flex items-center gap-2 pl-0"}>
          <Link to={"/"}>
            <img
              src={require("../../assets/logo-green.svg").default}
              className="aspect-square min-h-[3rem]"
              alt="logo"
            ></img>
          </Link>
          <span className="rounded-full bg-zinc-600 px-2 py-[2px] text-sm text-gray-300">
            alpha
          </span>
        </div>
        <Link to={"/app"} className={buttonStyle + " selected"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
          </svg>{" "}
          My Vault
        </Link>
        <ButtonLogout web3Auth={web3Auth} className={"mb-2 " + buttonStyle}>
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              />
            </svg>{" "}
            Log out
          </>
        </ButtonLogout>
      </div>
    </div>
  );
};

export default Sidebar;
