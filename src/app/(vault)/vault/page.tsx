"use client";

import { redirect } from "next/navigation";

export default async function VaultPage() {
  return redirect("/vault/my-vault");
}
