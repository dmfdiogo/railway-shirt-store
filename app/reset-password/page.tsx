import type { Metadata } from "next";

import { Suspense } from "react";

import { BeArtShell } from "@/components/ui/beart-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Redefinir senha — Be Art",
  description: "Defina uma nova senha para voltar a acessar sua conta Be Art.",
  path: "/reset-password",
});

export default function ResetPasswordPage() {
  return (
    <BeArtShell contentClassName="relative flex min-h-screen items-center justify-center px-6 py-12" footer>
      <Suspense>
        <div className="relative">
          <ResetPasswordForm />
        </div>
      </Suspense>
    </BeArtShell>
  );
}
