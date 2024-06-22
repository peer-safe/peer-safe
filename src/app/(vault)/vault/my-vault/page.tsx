"use client";

import { useState } from "react";
import Bars from "~/components/icons/bars";
import ChevronDown from "~/components/icons/chevron-down";
import Folder from "~/components/icons/folder";
import Squares from "~/components/icons/squares";
import Grid from "~/components/vault/Grid";
import { cn, formatBytes } from "~/lib/utils";

function FolderCard({
  dirname,
  numfiles,
  size,
}: {
  dirname: string;
  numfiles: number;
  size: number;
}) {
  return (
    <div className="relative flex h-40 flex-col justify-between rounded-xl bg-background from-[#26755D] to-[#26755D]/20 p-4 before:absolute before:-bottom-[2px] before:-left-[2px] before:-right-[2px] before:-top-[2px] before:-z-10 before:rounded-xl before:bg-gradient-to-tr">
      <Folder className="h-12 w-12 text-[#33836D]" />
      <div>
        <h4 className="">{dirname}</h4>
        <span className="text-sm text-muted-foreground">
          {numfiles} file{numfiles > 1 ? "s" : null}, {formatBytes(size)}
        </span>
      </div>
    </div>
  );
}

export default function MyVaultPage() {
  const [gridView, setGridView] = useState(true);

  return (
    <main className="flex flex-1 flex-col gap-2 px-4 pb-4">
      <div className="flex h-10 items-center justify-between">
        <div className="flex items-center gap-2 text-xl">
          Vault name
          <ChevronDown className="h-7 w-7 cursor-pointer rounded-full p-1 transition-colors hover:bg-muted" />
        </div>
        <div className="flex h-10 cursor-pointer items-center rounded-full border">
          <Squares
            className={cn(
              "h-10 w-10 rounded-full p-2",
              gridView ? "bg-muted" : "",
            )}
            onClick={() => setGridView(true)}
          />
          <Bars
            className={cn(
              "h-10 w-10 rounded-full p-2",
              gridView ? "" : "bg-muted",
            )}
            onClick={() => setGridView(false)}
          />
        </div>
      </div>
      <h3 className="text-lg text-muted-foreground">Folders</h3>
      <Grid>
        {/* change to list based on selected view */}
        <FolderCard dirname="Songs" numfiles={69} size={440401920} />
        <FolderCard dirname="Movies" numfiles={10} size={30020909765} />
        <FolderCard dirname="Pictures" numfiles={20} size={123456789} />
      </Grid>
    </main>
  );
}
