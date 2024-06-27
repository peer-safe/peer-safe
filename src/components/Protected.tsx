"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();

  useEffect(() => {
    if (!address) redirect("/");
  });

  return address ? children : "loading";
}
