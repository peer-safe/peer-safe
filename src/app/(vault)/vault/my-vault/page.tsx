"use client";

import { useState } from "react";
import Bars from "~/components/icons/bars";
import ChevronDown from "~/components/icons/chevron-down";
import Document from "~/components/icons/document";
import Folder from "~/components/icons/folder";
import Squares from "~/components/icons/squares";
import NodeContainerView from "~/components/vault/NodeContainerView";
import { cn, formatBytes } from "~/lib/utils";

const mockFolders = [
  {
    dirname: "Songs",
    numfiles: 69,
    size: 440401920,
  },
  {
    dirname: "Movies",
    numfiles: 10,
    size: 30020909765,
  },
  {
    dirname: "Pictures",
    numfiles: 20,
    size: 123456789,
  },
];

const mockFiles = [
  {
    filename: "Secret.txt",
    mimetype: "text/plain",
    size: 401920,
  },
  {
    filename: "Song.mp3",
    mimetype: "audio/mpeg",
    size: 13456789,
  },
];

function BaseNode({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("cursor-pointer", className)} {...props}>
      {children}
    </div>
  );
}

function FolderGridNode({
  dirname,
  numfiles,
  size,
}: {
  dirname: string;
  numfiles: number;
  size: number;
}) {
  return (
    <BaseNode className="relative flex h-40 flex-col justify-between rounded-xl bg-background from-[#26755D] to-[#26755D]/20 p-4 before:absolute before:-bottom-[2px] before:-left-[2px] before:-right-[2px] before:-top-[2px] before:-z-10 before:rounded-xl before:bg-gradient-to-tr">
      <Folder className="h-12 w-12 text-[#33836D]" />
      <div>
        <h4 className="text-base">{dirname}</h4>
        <span className="text-sm text-muted-foreground">
          {numfiles} file{numfiles > 1 ? "s" : null}, {formatBytes(size)}
        </span>
      </div>
    </BaseNode>
  );
}

function FileGridNode({
  filename,
  mimetype,
  size,
}: {
  filename: string;
  mimetype: string;
  size: number;
}) {
  return (
    <BaseNode className="relative flex h-40 flex-col justify-between rounded-xl bg-background from-[#26755D] to-[#26755D]/20 p-4 before:absolute before:-bottom-[2px] before:-left-[2px] before:-right-[2px] before:-top-[2px] before:-z-10 before:rounded-xl before:bg-gradient-to-tr">
      <Document className="h-12 w-12 text-[#33836D]" />
      <div>
        <h4 className="text-base">{filename}</h4>
        <span className="text-sm text-muted-foreground">
          {formatBytes(size)}
        </span>
      </div>
    </BaseNode>
  );
}

function FolderListNode({
  dirname,
  numfiles,
  size,
}: {
  dirname: string;
  numfiles: number;
  size: number;
}) {
  return (
    <BaseNode className="relative flex items-center gap-4 rounded-xl bg-background from-[#26755D] to-[#26755D]/20 px-4 py-2 before:absolute before:-bottom-[2px] before:left-[1px] before:right-[1px] before:top-[1px] before:-z-10 before:rounded-xl before:bg-gradient-to-tr">
      <Folder className="h-6 w-6 text-[#33836D]" />
      <h4 className="text-base">{dirname}</h4>
      <span className="text-sm text-muted-foreground">
        {numfiles} file{numfiles > 1 ? "s" : null}, {formatBytes(size)}
      </span>
    </BaseNode>
  );
}

function FileListNode({
  filename,
  mimetype,
  size,
}: {
  filename: string;
  mimetype: string;
  size: number;
}) {
  return (
    <BaseNode className="relative flex items-center gap-4 rounded-xl bg-background from-[#26755D] to-[#26755D]/20 px-4 py-2 before:absolute before:-bottom-[2px] before:left-[1px] before:right-[1px] before:top-[1px] before:-z-10 before:rounded-xl before:bg-gradient-to-tr">
      <Document className="h-6 w-6 text-[#33836D]" />
      <h4 className="text-base">{filename}</h4>
      <span className="text-sm text-muted-foreground">{formatBytes(size)}</span>
    </BaseNode>
  );
}

export default function MyVaultPage() {
  const [isGridView, setIsGridView] = useState(true);
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
              isGridView ? "bg-muted" : "",
            )}
            onClick={() => setIsGridView(true)}
          />
          <Bars
            className={cn(
              "h-10 w-10 rounded-full p-2",
              isGridView ? "" : "bg-muted",
            )}
            onClick={() => setIsGridView(false)}
          />
        </div>
      </div>
      <h3 className="text-lg text-muted-foreground">Folders</h3>
      <NodeContainerView isGridView={isGridView}>
        {/* change to list based on selected view */}
        {mockFolders.map((folder) =>
          isGridView ? (
            <FolderGridNode {...folder} />
          ) : (
            <FolderListNode {...folder} />
          ),
        )}
      </NodeContainerView>
      <h3 className="text-lg text-muted-foreground">Files</h3>
      <NodeContainerView isGridView={isGridView}>
        {/* change to list based on selected view */}
        {mockFiles.map((folder) =>
          isGridView ? (
            <FileGridNode {...folder} />
          ) : (
            <FileListNode {...folder} />
          ),
        )}
      </NodeContainerView>
    </main>
  );
}
