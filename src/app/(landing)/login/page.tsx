"use client";

import { redirect } from "next/navigation";
import { useAccount, useConnect } from "wagmi";
import Discord from "~/components/icons/discord";
import Github from "~/components/icons/github";
import Google from "~/components/icons/google";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";

export default function LoginPage() {
  const { connect, connectors } = useConnect();
  const { isConnecting, isConnected } = useAccount();

  if (isConnected) redirect("/");

  return (
    <main className="flex w-full grow flex-col items-center justify-center px-10 py-24">
      <div className="text-3xl font-semibold">Welcome back</div>
      <div className="text-gray-500">Choose how you want to proceed</div>
      <div className="flex w-full max-w-96 items-center gap-4 pt-6">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => {
            connect({ connector: connectors[0]! });
          }}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <Spinner color="hsl(var(--muted))" className="h-5 w-5" />
          ) : (
            <Google width={20} height={20} />
          )}
        </Button>
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => {
            connect({ connector: connectors[1]! });
          }}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <Spinner color="hsl(var(--muted))" className="h-5 w-5" />
          ) : (
            <Github width={20} height={20} />
          )}
        </Button>
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => {
            connect({ connector: connectors[2]! });
          }}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <Spinner color="hsl(var(--muted))" className="h-5 w-5" />
          ) : (
            <Discord width={20} height={20} />
          )}
        </Button>
      </div>
      {/* <Button
        variant={"outline"}
        className="w-full"
        onClick={() => {
          connect({ connector: connectors[3]! });
        }}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <Spinner color="hsl(var(--muted))" className="h-5 w-5" />
        ) : (
          <Discord width={20} height={20} />
        )}
      </Button> */}
    </main>
  );
}
