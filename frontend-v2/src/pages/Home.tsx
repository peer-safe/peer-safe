import { Web3Auth } from "@web3auth/modal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/home/hero";
import { useRef } from "react";
import { About, HowItWorks } from "../components/home/sections";

const Home = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {/* Background, whole screen
      <div className="fixed -left-20 -right-20 -top-20 -z-10 h-[calc(100vh+160px)] bg-cover" /> */}
      <div className="flex w-full min-w-[340px] flex-col items-center">
        <Navbar web3Auth={web3Auth} />
        {/* Content with max width */}
        <div className="flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 pb-6">
          {/* Hero */}
          <Hero web3Auth={web3Auth} howItWorksRef={howItWorksRef} />
          {/* Home page sections */}
          <div className="flex flex-col gap-20 pt-14">
            <div className="flex flex-col gap-16 lg:flex-row">
              <About />
              <HowItWorks howItWorksRef={howItWorksRef} />
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
