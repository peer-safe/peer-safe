import { forwardRef } from "react";

const baseSectionStyle =
  "relative flex flex-1 gap-8 rounded-2xl border-zinc-700 bg-[#101010] p-16 before:absolute before:-bottom-[1px] before:-left-[1px] before:-right-[1px] before:-top-[1px] before:-z-10 before:rounded-2xl before:bg-[#2d2d2d] before:border-glow before:content-[''] max-lg:justify-between max-sm:flex-col";

export const About = forwardRef(
  (props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={baseSectionStyle} ref={ref}>
        <>
          <span className="text-4xl font-semibold text-zinc-300">Why?</span>
          <div className="text-center text-lg text-zinc-500 sm:text-right">
            <span className="whitespace-nowrap">To save the world.</span>
            <wbr />
            <span className="whitespace-nowrap"> Really, we're serious.</span>
            <wbr />
            <span className="whitespace-nowrap"> Not convinced?</span> <br />
            <a
              href="https://spongeboi.notion.site/spongeboi/PeerSafe-d3aac8ebbd104f4fbba69ff930e6f13d"
              rel="noreferrer"
              target="_blank"
              className="whitespace-nowrap text-emerald-300 underline"
            >
              Read this
            </a>
          </div>
        </>
      </div>
    );
  }
);

export const HowItWorks = forwardRef(
  (props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={baseSectionStyle} ref={ref}>
        <>
          <span className="text-4xl font-semibold text-zinc-300">How?</span>
          <div className="text-center text-lg text-zinc-500 sm:text-right">
            Using the power of web3 and some <br />
            <a
              href="https://spongeboi.notion.site/spongeboi/PeerSafe-d3aac8ebbd104f4fbba69ff930e6f13d"
              rel="noreferrer"
              target="_blank"
              className="text-emerald-300 underline sm:text-right"
            >
              Magic ✨
            </a>
          </div>
        </>
      </div>
    );
  }
);
