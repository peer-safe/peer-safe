"use client";

import { deployContract } from "~/lib/contract-actions/peerSafeDeployer-actions";

export default function RequestsPage() {
  return (
    <main className="flex flex-1 flex-col justify-center gap-2 text-center text-xl text-muted-foreground">
      SHARE REQUESTS
      <button
        onClick={async () => {
          await deployContract();
        }}
      >
        test paymaster
      </button>
    </main>
  );
}
