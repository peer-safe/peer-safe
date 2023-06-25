import { type Web3Auth } from "@web3auth/modal";
import { Link } from "@tanstack/react-location";
import { useEffect, useRef, useState } from "react";
import { UserContextTypeInner } from "../../utils/globalContext";

const Navbar = ({
  web3Auth,
  userContext,
}: {
  web3Auth: Web3Auth;
  userContext: UserContextTypeInner;
}) => {
  const [userDetailsModalOpen, setUserDetailsModalOpen] = useState(false);
  const [copiedAddrText, setCopiedAddrText] = useState(false);
  const userDetailsModalRef = useRef<HTMLDivElement>(null);
  const userDetailsModalOpenRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (!userDetailsModalRef.current || !userDetailsModalOpenRef.current)
        return;
      const rect = userDetailsModalRef.current.getBoundingClientRect();
      const img = userDetailsModalOpenRef.current.getBoundingClientRect();
      const x = e.clientX,
        y = e.clientY;
      if (
        (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) &&
        Math.sqrt(
          (x - (img.left + img.width / 2)) ** 2 +
            (y - (img.top + img.height / 2)) ** 2
        ) >
          img.height / 2 &&
        userDetailsModalOpen
      ) {
        setUserDetailsModalOpen(false);
      }
    };
    document.body.addEventListener("click", closeModal);
    return () => {
      document.body.removeEventListener("click", closeModal);
    };
  }, [userDetailsModalOpen]);

  return (
    <div className="z-20 flex w-full">
      <div className="flex flex-1 items-center pb-4">
        <div className="flex items-center gap-2 lg:hidden">
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
        <div className="relative">
          <img
            alt="profile"
            src={userContext.userInfo.profileImage}
            height="48"
            width="48"
            ref={userDetailsModalOpenRef}
            onClick={() => {
              setUserDetailsModalOpen((open) => !open);
            }}
            className="relative cursor-pointer rounded-full border-2 border-[#2d2d2d]"
          />
          <div
            className={`absolute right-0 top-14 flex min-w-[12rem] flex-col ${
              userDetailsModalOpen ? "" : "hidden"
            }`}
            ref={userDetailsModalRef}
          >
            <div
              className={`ml-auto mr-4 h-0 w-0 border-x-8 border-b-8 border-[#212123] ${
                userDetailsModalOpen ? "" : "hidden"
              }`}
              style={{
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
              }}
            ></div>
            <div className="flex flex-col gap-2 rounded-xl bg-[#212123] p-4">
              <div className="max-w-xs break-words">
                {userContext.userInfo.name}
                <p className="text-xs text-zinc-500">
                  {userContext.userInfo.email}
                </p>
              </div>
              <a
                href={`https://mumbai.polygonscan.com/address/${userContext.vaultAddress}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-zinc-500 underline"
              >
                view vault contract
              </a>
              <p
                className={`text-sm text-zinc-500 ${
                  copiedAddrText ? "" : "cursor-pointer underline"
                }`}
                onClick={() => {
                  if (copiedAddrText) return;
                  navigator.clipboard.writeText(userContext.account);
                  setCopiedAddrText(true);
                  setTimeout(() => {
                    setCopiedAddrText(false);
                  }, 2000);
                }}
              >
                {copiedAddrText ? "copied" : "copy account address"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
