"use client";

import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Bars from "~/components/icons/bars";
import ChevronDown from "~/components/icons/chevron-down";
import Document from "~/components/icons/document";
import Folder from "~/components/icons/folder";
import Squares from "~/components/icons/squares";
import GridContainerView from "~/components/vault/NodeContainerView";
import { cn, formatBytes } from "~/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

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
  // mimetype,
  size,
}: {
  filename: string;
  // mimetype: string;
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

type ListNode = {
  data: {
    name: string;
    variant: "folder" | "file";
  };
  size: number;
};

const listCols: ColumnDef<ListNode>[] = [
  {
    accessorKey: "data",
    header: "Name",
    cell: ({ row }) => {
      const data: ListNode["data"] = row.getValue("data");
      const Icon = data.variant === "file" ? Document : Folder;
      return (
        <div className="flex items-center gap-4">
          <Icon className="h-5 w-5 text-[#33836D]" />
          <span className="text-base">{data.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const val: number = row.getValue("size");
      return (
        <span className="flex gap-4 text-sm text-muted-foreground ">
          {formatBytes(val)}
        </span>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ListViewTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
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
    <BaseNode className="relative flex items-center gap-4 bg-background from-[#26755D] to-[#26755D]/20 px-4 py-2 before:absolute before:-bottom-[1px] before:left-[0px] before:right-[0px] before:top-[0px] before:-z-10 before:bg-gradient-to-tr">
      <Folder className="h-6 w-6 text-[#33836D]" />
      <h4 className="text-base">{dirname}</h4>
      <span className="flex gap-4 text-sm text-muted-foreground ">
        <div>
          {numfiles} file{numfiles > 1 ? "s" : null}
        </div>
        <div>{formatBytes(size)}</div>
      </span>
    </BaseNode>
  );
}

function FileListNode({
  filename,
  // mimetype,
  size,
}: {
  filename: string;
  // mimetype: string;
  size: number;
}) {
  return (
    <BaseNode className="relative flex items-center gap-4 bg-background from-[#26755D] to-[#26755D]/20 px-4 py-2 before:absolute before:-bottom-[1px] before:left-[0px] before:right-[0px] before:top-[0px] before:-z-10 before:bg-gradient-to-tr">
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
      {isGridView ? (
        <>
          <h3 className="text-lg text-muted-foreground">Folders</h3>
          <GridContainerView>
            {mockFolders.map((folder, ind) =>
              isGridView ? (
                <FolderGridNode {...folder} key={ind} />
              ) : (
                <FolderListNode {...folder} key={ind} />
              ),
            )}
          </GridContainerView>
          <h3 className="text-lg text-muted-foreground">Files</h3>
          <GridContainerView>
            {mockFiles.map((file, ind) =>
              isGridView ? (
                <FileGridNode {...file} key={ind} />
              ) : (
                <FileListNode {...file} key={ind} />
              ),
            )}
          </GridContainerView>
        </>
      ) : (
        <ListViewTable
          columns={listCols}
          data={[
            ...mockFolders.map((folder) => ({
              data: {
                variant: "folder" as "folder",
                name: folder.dirname,
              },
              size: folder.size,
            })),
            ...mockFiles.map((file) => ({
              data: {
                variant: "file" as "file",
                name: file.filename,
              },
              size: file.size,
            })),
          ]}
        />
      )}
    </main>
  );
}
