"use client";

import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { useState, type FC } from "react";
import { type Connector, useAccount, useConnect } from "wagmi";
import Discord from "~/components/icons/discord";
import Github from "~/components/icons/github";
import Google from "~/components/icons/google";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";
import { emailWagmiConfig, socialProviders } from "~/lib/wagmi";

function ProviderLoginButton({
  connector,
  children,
}: {
  connector: Connector;
  children: React.ReactNode;
}) {
  const { connect } = useConnect();
  const { isConnecting } = useAccount();

  return (
    <Button
      variant={"outline"}
      className="w-full"
      onClick={() => {
        connect({ connector });
      }}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <Spinner color="hsl(var(--foreground))" className="h-5 w-5" />
      ) : (
        children
      )}
    </Button>
  );
}

const icons: Record<string, FC> = {
  google: Google,
  github: Github,
  discord: Discord,
  default: QuestionMarkIcon,
};

export default function LoginPage() {
  const { connectors } = useConnect();
  const { status, isConnecting } = useAccount();

  const [email, setEmail] = useState("");

  const { connect, connectors: emailConnectors } = useConnect({
    config: emailWagmiConfig(email),
  });

  if (status === "connected") redirect("/");

  return (
    <main className="flex w-full grow flex-col items-center justify-center gap-6 px-10 py-24">
      <div className="text-3xl font-semibold">Welcome back</div>
      <div className="-mt-6 text-gray-500">Choose how you want to proceed</div>
      <div className="flex w-full max-w-96 items-center gap-4">
        {connectors.map((connector, index) => {
          const Icon: FC<{ width: number; height: number }> =
            icons[socialProviders[index] ?? "default"]!;

          return connector.id === "web3auth" ? (
            <ProviderLoginButton connector={connector} key={index}>
              <Icon width={20} height={20} />
            </ProviderLoginButton>
          ) : null;
        })}
      </div>
      <Input
        placeholder="you@yourdomain.xyz"
        className="max-w-96"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        className="w-full max-w-96"
        disabled={
          isConnecting ||
          !/^[a-zA-Z0-9\._\+-]+@([a-zA-Z0-9\-]+\.){1,}([a-zA-Z]{2,16})$/.test(
            email,
          )
        }
        onClick={() => connect({ connector: emailConnectors[0]! })}
      >
        {isConnecting ? (
          <Spinner color="hsl(var(--background))" className="h-5 w-5" />
        ) : (
          <>Continue with Email &rarr;</>
        )}
      </Button>
    </main>
  );
}
