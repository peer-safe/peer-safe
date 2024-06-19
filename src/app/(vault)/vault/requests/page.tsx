"use client";

import WorkInProgress from "~/components/icons/wip";

export default function RequestsPage() {
  return (
    <main className="flex flex-1 flex-col justify-center gap-2 text-center text-xl text-muted-foreground">
      SHARE REQUESTS
      <WorkInProgress className="flex h-60 text-muted" />
    </main>
  );
}
