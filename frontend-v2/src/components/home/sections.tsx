import { forwardRef } from "react";

const baseSectionStyle =
  "relative flex flex-1 gap-8 rounded-2xl border-zinc-700 bg-[#101010] p-16 before:absolute before:-bottom-[1px] before:-left-[1px] before:-right-[1px] before:-top-[1px] before:-z-10 before:rounded-2xl before:bg-gradient-to-bl before:from-zinc-600 before:via-zinc-800 before:to-zinc-600 before:content-[''] max-lg:justify-between max-sm:flex-col";

export const About = () => {
  return (
    <div className={baseSectionStyle}>
      <>
        <span className="text-4xl font-semibold text-zinc-300">Why</span>
        <div className="text-lg text-zinc-500 sm:text-right">
          Peersafe encrypts all your files, and is fully decentralized.
        </div>
      </>
    </div>
  );
};

export const HowItWorks = forwardRef(
  (props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={baseSectionStyle} ref={ref}>
        <>
          <span className="text-4xl font-semibold text-zinc-300">How</span>
          <div className="flex justify-center gap-2 self-center text-lg text-zinc-500 max-sm:pb-4 sm:max-lg:pr-8 lg:flex-1">
            <p className="flex gap-2">
              Magic{" "}
              <span className="relative">
                <a
                  href="https://www.youtube.com/watch?v=p7YXXieghto"
                  rel="noreferrer"
                  target="_blank"
                  className="text-2xl"
                >
                  ✨
                </a>
                <img
                  alt="arrow"
                  src={require("../../assets/arrow.svg").default}
                  className="absolute left-5 top-5 min-w-[3rem] -scale-x-100"
                ></img>
              </span>
            </p>
          </div>
        </>
      </div>
    );
  }
);
