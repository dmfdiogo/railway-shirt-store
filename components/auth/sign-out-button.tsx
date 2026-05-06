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
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-950/10 px-6 text-sm font-medium text-stone-700 transition hover:bg-stone-950/5 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Saindo..." : "Sair"}
    </button>
  );
}