"use client";

import { ArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";
import Illustration from "~/components/Illustration";
import { Button, buttonVariants } from "~/components/ui/button";
import MaxWidth from "~/components/ui/max-width";
import { cn } from "~/lib/utils";
import { useAccount } from "wagmi";

export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <main>
      <MaxWidth>
        <div className="relative flex h-[calc(100vh-8rem)] flex-col py-12">
          <Illustration />
          <span className="flex flex-1 items-center text-7xl font-semibold fade-in">
            Peer<span className="text-emerald-400">Safe</span>
          </span>
          <div className="relative flex flex-col gap-6 py-6 fade-in">
            <span className="text-4xl">own your data.</span>
            <span className="max-w-[26rem] text-lg text-zinc-500">
              a next-gen decentralized file storage solution that ensures that
              your data is truly yours
            </span>

            {/* Buttons container */}
            <div className="flex gap-4">
              <div className="hover:border-glow rounded-full p-[1px]">
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "flex items-center gap-2 py-6",
                  )}
                  href={isConnected ? "/vault" : "/login"}
                >
                  Launch app
                  <ArrowUpRightFromSquare className="h-5 w-5" />
                </Link>
              </div>

              <Button variant="outline" className="py-6">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </MaxWidth>
    </main>
  );
}
