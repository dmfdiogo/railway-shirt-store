"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await signOut();
          router.push("/");
          router.refresh();
        });
      }}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-transparent px-6 text-sm font-medium text-white/68 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Saindo..." : "Encerrar sessão"}
    </button>
  );
}