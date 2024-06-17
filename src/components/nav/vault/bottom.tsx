"use client";

import { usePathname } from "next/navigation";
import Home from "~/components/icons/home";
import Settings from "~/components/icons/settings";
import Users from "~/components/icons/users";
import Link from "next/link";

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex h-16 w-full items-center justify-around border-t bg-background/75 md:hidden">
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
