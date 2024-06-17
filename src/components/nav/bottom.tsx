"use client";

import { usePathname } from "next/navigation";
import Home from "../icons/home";
import Settings from "../icons/settings";

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 flex h-16 w-full items-center justify-around border-t bg-background/75 sm:hidden">
      <button className="">
        <Home className={pathname === "/vault" ? "" : "stroke-foreground/60"} />
      </button>
      <button>
        <Settings
          className={
            pathname === "/vault/settings" ? "" : "stroke-foreground/60"
          }
        />
      </button>
    </nav>
  );
};

export default BottomNav;
