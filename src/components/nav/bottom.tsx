"use client";

import { usePathname } from "next/navigation";
import Home from "../icons/home";
import Settings from "../icons/settings";
import Users from "../icons/users";
import Link from "next/link";

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 flex h-16 w-full items-center justify-around border-t bg-background/75 sm:hidden">
      <Link href="/vault">
        <Home className={pathname === "/vault" ? "" : "stroke-foreground/60"} />
      </Link>
      <Link href="/vault/requests">
        <Users
          className={
            pathname === "/vault/requests" ? "" : "stroke-foreground/60"
          }
        />
      </Link>
      <Link href="/vault/settings">
        <Settings
          className={
            pathname === "/vault/settings" ? "" : "stroke-foreground/60"
          }
        />
      </Link>
    </nav>
  );
};

export default BottomNav;
