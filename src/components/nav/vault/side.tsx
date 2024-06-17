"use client";

import { usePathname } from "next/navigation";
import Home from "~/components/icons/home";
import Settings from "~/components/icons/settings";
import Users from "~/components/icons/users";
import Link from "next/link";
import Image from "next/image";
import { Resizable } from "re-resizable";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useDisconnect } from "wagmi";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md p-2",
        pathname === href ? "bg-secondary" : "",
      )}
    >
      {children}
    </Link>
  );
};

const SideNav = () => {
  const { disconnect } = useDisconnect();

  return (
    <Resizable
      defaultSize={{ width: 260 }}
      minWidth={260}
      maxWidth={388}
      enable={{ right: true }}
      className="hidden border-r md:flex"
    >
      <nav className="flex h-full w-full flex-col gap-4 p-4">
        <Link
          href="/vault"
          className="flex items-center gap-4 self-stretch text-lg font-semibold"
        >
          <Image
            src="/logo192.png"
            height={32}
            width={32}
            className="object-contain"
            alt="logo"
          />
          <span>Peersafe</span>
        </Link>
        <div className="py-4" />
        <NavItem href="/vault/my-vault">
          <Home />
          My vault
        </NavItem>
        <NavItem href="/vault/requests">
          <Users />
          Requests
        </NavItem>
        <NavItem href="/vault/settings">
          <Settings />
          Settings
        </NavItem>
        <div className="flex-1" />
        <Button onClick={() => disconnect()} variant="outline">
          Logout
        </Button>
      </nav>
    </Resizable>
  );
};

export default SideNav;
