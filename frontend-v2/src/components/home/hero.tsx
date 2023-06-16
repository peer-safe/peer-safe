import { Web3Auth } from "@web3auth/modal";
import BaseButton from "../BaseButton";
import { ButtonLogin } from "../ButtonsAuth";
import { useContext } from "react";
import { UserContext } from "../../utils/globalContext";
import { Link, useNavigate } from "@tanstack/react-location";

const heroButtonStyle =
  "px-4 py-2 gap-2 transition-all justify-center ease-in-out bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 rounded-full flex items-center disabled:cursor-wait";

const Hero = ({
  howItWorksRef,
  web3Auth,
}: {
  howItWorksRef: React.RefObject<HTMLDivElement>;
  web3Auth: Web3Auth;
}) => {
  const { userContext } = useContext(UserContext)!;
  const navigate = useNavigate();
  return (
    <div className="relative flex h-[calc(100vh-8rem)] flex-col py-12">
      <div className="fade-in-2 absolute bottom-0 right-0 top-0 -z-10 flex aspect-[646/820] items-center justify-end">
        <img
          alt="illustration"
          className="max-w-[20rem] flex-1 md:max-w-[26rem] lg:max-w-[32rem] 2xl:max-w-[36rem]"
          loading="eager"
          src={require("../../assets/hero_illustration.webp")}
        />
      </div>
      <span className="fade-in flex flex-1 items-center text-7xl font-semibold">
        Peer<span className="text-emerald-300">Safe</span>
      </span>
      <div className="fade-in relative flex flex-col gap-6 py-6">
        <span className="max-w-[26rem] text-5xl font-semibold text-zinc-300">
          OWN your data.
        </span>
        <span className="max-w-[26rem] text-lg text-zinc-500">
          a next-gen decentralized file storage solution that ensures that your
          data is truly yours
        </span>
        {/* Buttons container */}
        <div className="flex gap-4">
          {userContext ? (
            <Link to="/app">
              <BaseButton className={heroButtonStyle}>My vault</BaseButton>
            </Link>
          ) : (
            <ButtonLogin
              className={heroButtonStyle}
              web3Auth={web3Auth}
              onSuccess={() => navigate({ to: "/app" })}
            >
              <>
                Let's start
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
              howItWorksRef.current?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Learn more
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
