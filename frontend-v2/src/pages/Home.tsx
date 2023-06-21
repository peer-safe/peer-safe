import { Web3Auth } from "@web3auth/modal";
import Navbar from "../components/home/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/home/Hero";
import { useEffect, useRef } from "react";
import { About, HowItWorks } from "../components/home/Sections";

const Home = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const howItWorksDiv = howItWorksRef.current,
      aboutDiv = aboutRef.current,
      pageDiv = pageRef.current;
    if (!pageDiv || !howItWorksDiv || !aboutDiv) return;

    const moveEvent = (ev: MouseEvent) => {
      [howItWorksDiv, aboutDiv].forEach((target) => {
        const rect = target.getBoundingClientRect(),
          x = ev.clientX - rect.left,
          y = ev.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    if (matchMedia('(pointer:fine)').matches) {
      pageDiv.addEventListener("mousemove", moveEvent);
    }
    
    return () => {
      pageDiv.removeEventListener("mousemove", moveEvent);
    };
  }, [howItWorksRef, aboutRef, pageRef]);

  return (
    <>
      <div
        ref={pageRef}
        className="flex w-full min-w-[25rem] flex-col items-center"
      >
        <Navbar web3Auth={web3Auth} />
        {/* Content with max width */}
        <div className="flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 pb-6">
          {/* Hero */}
          <Hero web3Auth={web3Auth} howItWorksRef={howItWorksRef} />
          {/* Home page sections */}
          <div className="flex flex-col gap-20 pt-14">
            <div className="flex flex-col gap-16 lg:flex-row">
              <About ref={aboutRef} />
              <HowItWorks ref={howItWorksRef} />
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
