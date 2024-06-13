"use client";

import { useMutation } from "@tanstack/react-query";
import { serverAction } from "~/server/actions";
import { Button } from "../ui/button";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function VaultPage() {
  const { mutate, isPending } = useMutation({
    mutationFn: serverAction,
  });
  const { isConnected } = useAccount()

  if (!isConnected) return redirect("/");

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      Vault Page
      <Button onClick={() => mutate()} disabled={isPending}>
        Click
      </Button>
    </div>
  );
}
