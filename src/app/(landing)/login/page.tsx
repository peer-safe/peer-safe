"use client";

import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { type Connector, useAccount, useConnect } from "wagmi";
import Discord from "~/components/icons/discord";
import Github from "~/components/icons/github";
import Google from "~/components/icons/google";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { connectorNames } from "~/lib/wagmi";

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

const icons: Record<string, React.FC> = {
  google: Google,
  github: Github,
  discord: Discord,
};

export default function LoginPage() {
  const { connectors } = useConnect();
  const { status } = useAccount();

  if (status === "connected") redirect("/");

  return (
    <main className="flex w-full grow flex-col items-center justify-center px-10 py-24">
      <div className="text-3xl font-semibold">Welcome back</div>
      <div className="text-gray-500">Choose how you want to proceed</div>
      <div className="flex w-full max-w-96 items-center gap-4 pt-6">
        {connectors.map((connector, index) => {
          const Icon = icons[connectorNames[index] || ""] || QuestionMarkIcon;

          return connector.id === "web3auth" ? (
            <ProviderLoginButton connector={connector} key={index}>
              <Icon width={20} height={20} />
            </ProviderLoginButton>
          ) : null;
        })}
      </div>
    </main>
  );
}
