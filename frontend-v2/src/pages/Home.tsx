import { Web3Auth } from "@web3auth/modal";
import { ButtonLogin } from "../components/ButtonsAuth";
import { Link, useNavigate } from "@tanstack/react-location";
import { useContext } from "react";
import { UserContext } from "../utils/globalContext";
import BaseButton from "../components/BaseButton";
import Navbar from "../components/Navbar";

const heroButtonStyle =
  "py-2 px-4 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center gap-2 disabled:bg-zinc-900";
const Home = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const navigate = useNavigate();
  const { userContext } = useContext(UserContext)!;
  return (
    <>
      {/* Background, whole screen */}
      <div className="fixed -left-20 -right-20 -top-20 -z-10 h-[calc(100vh+160px)] bg-home bg-cover max-md:bg-homeMobile" />
      <div className="flex w-full justify-center">
        {/* Content with max width */}
        <div className="flex max-w-5xl flex-1 flex-col p-6">
          <Navbar web3Auth={web3Auth} />
          {/* Hero */}
          <div className="mt-28 flex flex-col items-center gap-12">
            <span className="text-6xl font-semibold">peersafe</span>
            <span className="max-w-[26rem] text-center text-lg text-zinc-500">
              a next-gen decentralized file storage solution that ensures that
              your data is truly yours
            </span>
            {/* Buttons container */}
            <div className="flex gap-4 pb-24">
              {userContext ? (
                <Link to="/app">
                  <BaseButton className={heroButtonStyle}>go to app</BaseButton>
                </Link>
              ) : (
                <ButtonLogin
                  className={heroButtonStyle}
                  web3Auth={web3Auth}
                  onSuccess={() => navigate({ to: "/app" })}
                >
                  <>
                    start here
                    <svg
                      height="17px"
                      width="17px"
                      viewBox="0 0 17 17"
                      version="1.1"
                    >
                      <path
                        d="M9.644 8.5l-6.854 6.854-0.707-0.707 6.146-6.147-6.146-6.146 0.707-0.708 6.854 6.854zM7.634 1.646l-0.707 0.708 6.146 6.146-6.146 6.146 0.707 0.707 6.853-6.853-6.853-6.854z"
                        fill="#ffffff"
                      />
                    </svg>
                  </>
                </ButtonLogin>
              )}
              <BaseButton
                className={heroButtonStyle}
                onClick={() => {
                  window.open(
                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    "_blank"
                  );
                }}
              >
                how it works
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
