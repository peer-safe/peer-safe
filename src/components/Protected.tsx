"use client";

import { redirect } from "next/navigation";
import { useAccount } from "wagmi";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();

  if (!address) return redirect("/");

  return children;
}
