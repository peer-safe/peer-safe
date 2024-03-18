import { Web3Auth } from "@web3auth/modal";
import BaseButton from "../BaseButton";
import Illustration from "./Illustration";
import { singleMousePosSetter } from "../../utils/mousePosSetter";

const heroButtonStyle =
  "px-4 py-2 gap-2 transition-all justify-center ease-in-out bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 rounded-full flex items-center disabled:cursor-wait";

const Hero = ({
  howItWorksRef,
  web3Auth,
}: {
  howItWorksRef: React.RefObject<HTMLDivElement>;
  web3Auth: Web3Auth;
}) => {

  return (
    <div className="relative flex h-[calc(100vh-8rem)] flex-col py-12">
      <Illustration />
      <span className="fade-in flex flex-1 items-center text-7xl font-semibold">
        Peer<span className="text-emerald-400">Safe</span>
      </span>
      <div className="fade-in relative flex flex-col gap-6 py-6">
        <span className="text-4xl text-zinc-300">own your data.</span>
        <span className="max-w-[26rem] text-lg text-zinc-500">
          a next-gen decentralized file storage solution that ensures that your
          data is truly yours
        </span>
        {/* Buttons container */}
        <div className="flex gap-4">
          <div
            onMouseMove={
              matchMedia("(pointer:fine)").matches
                ? singleMousePosSetter
                : undefined
            }
            className="hover:border-glow rounded-full p-[1px]"
          >
            <BaseButton className={heroButtonStyle}>
              <>
                Let's start
                <img
                  src={require("../../assets/right-arrow.svg").default}
                  alt="rightarrow"
                  height="18px"
                  width="18px"
                />
              </>
            </BaseButton>
          </div>
          <div className="p-[1px]">
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
    </div>
  );
};

export default Hero;
