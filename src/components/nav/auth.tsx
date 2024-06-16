"use client";

import { useAccount, useDisconnect, useConnect } from "wagmi";
import { Button, buttonVariants } from "~/components/ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Auth() {
  const { isConnected } = useAccount();
  return (
    <div className="flex h-full items-center gap-4">
      {isConnected ? (
        <>
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

const SignIn = () => {
  const { isConnecting } = useAccount();
  const pathname = usePathname();
  if (pathname.startsWith("/login")) return null;
  return (
    <Link
      href={"/login"}
      className={cn("flex gap-2", buttonVariants({ variant: "default" }))}
    >
      {isConnecting ? "" : "Login"}
      {isConnecting ? (
        <Spinner color="hsl(var(--muted))" className="h-5 w-5" />
      ) : null}
    </Link>
  );
};

const SignOut = () => {
  const { disconnect } = useDisconnect();
  return (
    <Button
      onClick={() => {
        disconnect();
      }}
    >
      Logout
    </Button>
  );
};
