"use client";

import { redirect } from "next/navigation";
import { useAccount } from "wagmi";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  if (!isConnected) return redirect("/");
  return children;
}
