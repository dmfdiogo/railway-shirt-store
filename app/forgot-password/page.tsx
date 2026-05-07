import type { Metadata } from "next";

import { BeArtShell } from "@/components/ui/beart-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Recuperar senha — Be Art",
  description: "Solicite um link para redefinir a senha da sua conta Be Art.",
  path: "/forgot-password",
});

export default function ForgotPasswordPage() {
  return (
    <BeArtShell contentClassName="relative flex min-h-screen items-center justify-center px-6 py-12" footer>
      <ForgotPasswordForm />
    </BeArtShell>
  );
}
