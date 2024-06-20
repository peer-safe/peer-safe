"use client";

import { usePathname } from "next/navigation";
import Home from "~/components/icons/home";
import Settings from "~/components/icons/settings";
import Users from "~/components/icons/users";
import Plus from "~/components/icons/plus";
import Link from "next/link";
import Image from "next/image";
import { Resizable } from "re-resizable";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useDisconnect } from "wagmi";
import Logout from "~/components/icons/logout";

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
        "flex items-center gap-2 rounded-md p-2 transition duration-200 ease-in-out hover:bg-secondary",
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
      <nav className="flex h-full w-full flex-col gap-1 p-4">
        <Link
          href="/vault"
          className="flex h-12 items-center gap-4 self-stretch text-lg font-semibold"
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
        <Button className="my-3">
          <span className="flex items-center">
            <Plus className="h-5 w-5" color="hsl(var(--primary-foreground))" />
            &nbsp;&nbsp;New
          </span>
        </Button>
        <NavItem href="/vault/my-vault">
          <Home className="h-5 w-5" />
          My Vault
        </NavItem>
        <NavItem href="/vault/requests">
          <Users className="h-5 w-5" />
          Requests
        </NavItem>
        <NavItem href="/vault/settings">
          <Settings className="h-5 w-5" />
          Settings
        </NavItem>
        <div className="grow" />
        <Button onClick={() => disconnect()} variant="outline" size="icon">
          <Logout className="h-5 w-5" />
        </Button>
      </nav>
    </Resizable>
  );
};

export default SideNav;
