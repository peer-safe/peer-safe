import BaseButton from "./BaseButton";

const footerButtonStyle =
  "px-4 py-2 gap-2 transition-all justify-center ease-in-out bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 rounded-full flex items-center disabled:cursor-wait";

const Footer = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        By
        <a
          href="https://spongeboi.com/"
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
        &
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
    </div>
  );
};

export default Footer;
