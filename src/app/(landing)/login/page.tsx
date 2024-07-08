"use client";

// import { QuestionMarkIcon } from "@radix-ui/react-icons";
// import Discord from "~/components/icons/discord";
// import Github from "~/components/icons/github";
// import Google from "~/components/icons/google";
// import { Input } from "~/components/ui/input";
// import { Separator } from "~/components/ui/separator";
// import { useState, type FC } from "react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useAccountEffect, useConnect } from "wagmi";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { abi } from "~/lib/peerSafeDeployerAbi";
import { privateKeyToPublicKey } from "@peer-safe/tessera-js";
import { generatePrivateKey } from "viem/accounts";
import { coinbaseWallet } from "wagmi/connectors";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { contract } from "~/lib/peer-safe";
import { usePeersafe } from "~/hooks/peersafe-provider";
import { useDeployContract } from "~/lib/contract-actions/peerSafeDeployer-actions";

// import { emailWagmiConfig, socialProviders } from "~/lib/wagmi";

// function ProviderLoginButton({
//   connector,
//   children,
// }: {
//   connector: Connector;
//   children: React.ReactNode;
// }) {
//   const { connect, isPending } = useConnect();
//   const { isConnecting } = useAccount();

//   return (
//     <Button
//       variant={"outline"}
//       className="w-full"
//       onClick={() => {
//         connect({ connector });
//       }}
//       disabled={isConnecting || isPending}
//     >
//       {isConnecting || isPending ? (
//         <Spinner color="hsl(var(--foreground))" className="h-5 w-5" />
//       ) : (
//         children
//       )}
//     </Button>
//   );
// }

// const icons: Record<string, FC> = {
//   google: Google,
//   github: Github,
//   discord: Discord,
//   default: QuestionMarkIcon,
// };

export default function LoginPage() {
  const { connect, isPending } = useConnect({});
  const { status, isConnecting } = useAccount();
  const { example } = usePeersafe();
  const deployContract = useDeployContract();

  useAccountEffect({
    onConnect: async (data) => {
      const vault = await contract.read
        .getVault([data.address])
        .catch(() => undefined); // does not exist
      if (vault) return;
      const pubKey = await contract.read.getPubKey([data.address]);
      console.log("deploying...");
      await deployContract(pubKey);
    },
  });

  // const [email, setEmail] = useState("");

  // const { connect, connectors: emailConnectors } = useConnect({
  //   config: emailWagmiConfig(email),
  // });

  useEffect(() => {
    if (status === "connected") redirect("/vault");
  }, [status]);

  return (
    <main className="flex w-full grow flex-col items-center justify-center gap-6 px-10 py-24">
      <div className="text-3xl font-semibold">Welcome back</div>
      <div className="-mt-6 text-gray-500">Choose how you want to proceed</div>
      {/* <div className="flex w-full max-w-96 items-center gap-4">
        {connectors.map((connector, index) => {
          const Icon: FC<{ width: number; height: number }> =
            icons[socialProviders[index] ?? "default"]!;

          return connector.id === "web3auth" ? (
            <ProviderLoginButton connector={connector} key={index}>
              <Icon width={20} height={20} />
            </ProviderLoginButton>
          ) : null;
        })}
      </div> */}
      {/* <div className="flex w-96 items-center gap-2 text-muted-foreground">
        <Separator />
        or
        <Separator />
      </div> */}
      {/* <Button
        className="w-full max-w-96"
        onClick={() => {
          connect({ connector: coinbaseWallet() });
        }}
        disabled={isConnecting || isPending}
      >
        {isConnecting || isPending ? (
          <Spinner color="hsl(var(--background))" className="h-5 w-5" />
        ) : (
          <>Continue with Coinbase &rarr;</>
        )}
      </Button> */}
      <ConnectButton />
      {/* <div className="flex w-96 items-center gap-2 text-muted-foreground">
        <Separator />
        or
        <Separator />
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
          isPending ||
          !/^[a-zA-Z0-9\._\+-]+@([a-zA-Z0-9\-]+\.){1,}([a-zA-Z]{2,16})$/.test(
            email,
          )
        }
        onClick={() => connect({ connector: emailConnectors[0]! })}
      >
        {isConnecting || isPending ? (
          <Spinner color="hsl(var(--background))" className="h-5 w-5" />
        ) : (
          <>Continue with Email &rarr;</>
        )}
      </Button> */}
    </main>
  );
}
