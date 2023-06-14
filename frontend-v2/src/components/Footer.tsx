import BaseButton from "./BaseButton";

const footerButtonStyle =
  "px-4 py-2 gap-2 transition-all justify-center ease-in-out bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 rounded-full flex items-center disabled:cursor-wait";

const Footer = () => {
  return (
    <div className="flex items-center gap-4">
      <a
        href="https://www.github.com/peer-safe/"
        target="_blank"
        rel="noreferrer"
      >
        <BaseButton className={footerButtonStyle}>
          <img
            src="https://images.web3auth.io/login-github-light.svg"
            alt="github"
            width="20px"
            height="auto"
          ></img>
          <span className="max-sm:hidden">GitHub</span>
        </BaseButton>
      </a>
      <div className="h-8 w-0.5 self-center bg-zinc-500 opacity-40" />
      <div className="flex items-center gap-2">
        TEAM
        <a
          href="https://github.com/Shubhaankar-Sharma/"
          target="_blank"
          rel="noreferrer"
        >
          <BaseButton className={footerButtonStyle}>
            <img
              src="https://github.com/Shubhaankar-Sharma.png"
              alt="member"
              width="20px"
              height="auto"
              className="rounded-full"
            ></img>
            <span className="max-sm:hidden">SpongeBoi</span>
          </BaseButton>
        </a>
        <a
          href="https://github.com/Shiv-Patil/"
          target="_blank"
          rel="noreferrer"
        >
          <BaseButton className={footerButtonStyle}>
            <img
              src="https://github.com/Shiv-Patil.png"
              alt="member"
              width="20px"
              height="auto"
              className="rounded-full"
            ></img>
            <span className="max-sm:hidden">KrYmZiN</span>
          </BaseButton>
        </a>
      </div>
      <div className="flex-1" />
      <BaseButton
        className={
            footerButtonStyle +
          " max-sm:aspect-square max-sm:self-stretch max-sm:px-0 max-sm:py-0"
        }
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="max-sm:hidden">Top</span>⬆
      </BaseButton>
    </div>
  );
};

export default Footer;
