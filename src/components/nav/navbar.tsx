"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "~/components/ui/theme-toggle";
import MaxWidth from "../ui/max-width";
import Auth from "./auth";

const Navbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-50 h-16 w-full border-b bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidth className="h-full flex-row items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-4 self-stretch text-lg font-semibold"
        >
          <Image
            src="/logo192.png"
            height={32}
            width={32}
            className="object-contain"
            alt="logo"
          />
          <span className="hidden sm:block">Peersafe</span>
        </Link>
        <div className="flex items-center gap-4 ">
          <ThemeToggle />
          <Auth />
        </div>
      </MaxWidth>
    </nav>
  );
};

export default Navbar;
