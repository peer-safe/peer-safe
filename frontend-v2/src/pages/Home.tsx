import { Web3Auth } from "@web3auth/modal";
import { ButtonLogin } from "../components/ButtonsAuth";
import { Link, useNavigate } from "@tanstack/react-location";
import { useContext, useRef } from "react";
import { UserContext } from "../utils/globalContext";
import BaseButton from "../components/BaseButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const homeButtonStyle =
  "px-4 py-2 gap-2 transition-all justify-center ease-in-out bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 rounded-full flex items-center disabled:cursor-wait";
const Home = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const navigate = useNavigate();
  const { userContext } = useContext(UserContext)!;
  const howItWorksRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {/* Background, whole screen
      <div className="fixed -left-20 -right-20 -top-20 -z-10 h-[calc(100vh+160px)] bg-cover" /> */}
      <div className="flex w-full min-w-[340px] flex-col items-center">
        <Navbar web3Auth={web3Auth} />
        {/* Content with max width */}
        <div className="flex w-full max-w-5xl flex-1 flex-col gap-12 overflow-hidden px-6 pb-6">
          {/* Hero */}
          <div className="relative flex h-[calc(100vh-6rem)] justify-center">
            <div className="fade-in-2 absolute bottom-0 top-0 -z-10 aspect-[589/408] bg-hero bg-cover opacity-0"></div>
            <div className="fade-in flex flex-col items-center justify-center gap-12">
              <span className="text-6xl font-semibold">
                Peer<span className="text-green-400">Safe</span>
              </span>
              <span className="max-w-[26rem] text-center text-lg text-zinc-500">
                a next-gen decentralized file storage solution that ensures that
                your data is truly yours
              </span>
              {/* Buttons container */}
              <div className="flex gap-4">
                {userContext ? (
                  <Link to="/app">
                    <BaseButton className={homeButtonStyle}>
                      go to app
                    </BaseButton>
                  </Link>
                ) : (
                  <ButtonLogin
                    className={homeButtonStyle}
                    web3Auth={web3Auth}
                    onSuccess={() => navigate({ to: "/app" })}
                  >
                    <>
                      Try it out
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
                  className={homeButtonStyle}
                  onClick={() => {
                    howItWorksRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  how it works ↓
                </BaseButton>
              </div>
            </div>
          </div>
          {/* about container */}
          <div className="flex flex-col gap-40">
            <div className="flex flex-col gap-12">
              <span className="text-center text-5xl font-semibold text-zinc-300">
                Why?
              </span>
              <div className="text-center text-lg text-zinc-500">
                <span className="text-green-400">OWN</span> your data.
                <br />
                Peersafe encrypts all your files, and is fully decentralized.
              </div>
            </div>
            {/* how it works container */}
            <div ref={howItWorksRef} className="flex flex-col gap-12">
              <span className="text-center text-5xl font-semibold text-zinc-300">
                How it works
              </span>
              <div className="flex flex-col gap-12 text-center text-lg text-zinc-500">
                <p>Magic ✨ (not really, will update this soon)</p>
              </div>
            </div>
            {/* footer */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
