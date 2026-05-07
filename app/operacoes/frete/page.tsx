import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { BeArtShell } from "@/components/ui/beart-shell";
import { auth, isAuthConfigured } from "@/lib/auth";
import {
  canManageMelhorEnvio,
  getMelhorEnvioMigrationRequiredMessage,
  getMelhorEnvioTokenSnapshot,
  isMelhorEnvioOAuthConfigured,
} from "@/lib/melhor-envio";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Operacoes de frete — Be Art",
  description: "Painel interno para conectar e acompanhar a integracao do Melhor Envio.",
  path: "/operacoes/frete",
});

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getMelhorEnvioFeedback(status?: string) {
  switch (status) {
    case "connected":
      return {
        className: "border-emerald-400/20 bg-emerald-500/12 text-emerald-100",
        message: "Sandbox conectado com sucesso. As proximas cotacoes ja podem usar o token salvo no servidor.",
      };
    case "invalid-state":
      return {
        className: "border-amber-400/20 bg-amber-500/12 text-amber-100",
        message: "A autorizacao retornou com um estado invalido ou com uma sessao diferente da que iniciou a conexao.",
      };
    case "error":
      return {
        className: "border-red-400/20 bg-red-500/12 text-red-100",
        message: "Nao foi possivel concluir a autorizacao com o Melhor Envio. Confira as credenciais e tente outra vez.",
      };
    default:
      return null;
  }
}

export default async function ShippingOperationsPage({
  searchParams,
}: {
  searchParams: Promise<{ "melhor-envio"?: string; message?: string }>;
}) {
  if (!isAuthConfigured()) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?redirectTo=%2Foperacoes%2Ffrete");
  }

  if (!canManageMelhorEnvio(session.user.email)) {
    notFound();
  }

  const { missingTable, token: melhorEnvioToken } = await getMelhorEnvioTokenSnapshot();

  const oauthReady = isMelhorEnvioOAuthConfigured();
  const params = await searchParams;
  const feedback = getMelhorEnvioFeedback(params["melhor-envio"]);
  const operatorRestrictionEnabled = Boolean(process.env.MELHOR_ENVIO_OPERATOR_EMAILS?.trim());

  return (
    <BeArtShell authReady footer navbar sessionActive contentClassName="relative px-6 pb-12 pt-28 sm:px-10 lg:px-16">
      <section className="mx-auto w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">Operacoes</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">Integracao de frete</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
              Esta area controla a autorizacao da conta da loja no Melhor Envio. Clientes continuam podendo comprar sem cadastro e sem passar por esta etapa.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/account"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-medium text-white/82 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              Voltar para a conta
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-white/36">{session.user.email}</p>
          </div>
        </div>

        {feedback ? (
          <div className={`mt-10 rounded-[1.3rem] border px-5 py-4 text-sm leading-7 ${feedback.className}`}>
            {feedback.message}
            {params.message ? <p className="mt-2 text-xs text-current/80">{params.message}</p> : null}
          </div>
        ) : null}

        {!operatorRestrictionEnabled ? (
          <div className="mt-10 rounded-[1.3rem] border border-amber-400/20 bg-amber-500/12 px-5 py-4 text-sm leading-7 text-amber-100">
            O acesso desta tela ainda nao esta restrito por e-mail. Defina <strong>MELHOR_ENVIO_OPERATOR_EMAILS</strong> para limitar quem pode gerenciar esta integracao.
          </div>
        ) : null}

        {missingTable ? (
          <div className="mt-10 rounded-[1.3rem] border border-amber-400/20 bg-amber-500/12 px-5 py-4 text-sm leading-7 text-amber-100">
            {getMelhorEnvioMigrationRequiredMessage()} Rode <strong>npm run db:migrate:dev</strong> no banco local antes de conectar o sandbox.
          </div>
        ) : null}

        <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-[#A5ADFF]">Melhor Envio</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                Conectar a conta da loja para cotacoes reais
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
                A autorizacao libera a geracao de fretes reais no carrinho e no checkout usando o aplicativo cadastrado no Melhor Envio.
              </p>
            </div>

            {oauthReady && !missingTable ? (
              <Link
                href="/api/integrations/melhor-envio/connect"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5"
              >
                {melhorEnvioToken ? "Reconectar sandbox" : "Conectar sandbox"}
              </Link>
            ) : missingTable ? (
              <div className="rounded-full border border-amber-400/20 bg-amber-500/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
                Aplique a migration IntegrationToken neste banco
              </div>
            ) : (
              <div className="rounded-full border border-amber-400/20 bg-amber-500/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
                Configure client id, secret e redirect URI no servidor
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-[1.2rem] border border-white/10 bg-black/10 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Status</p>
              <p className="mt-3 text-base font-semibold text-white">
                {missingTable ? "Migration pendente" : melhorEnvioToken ? "Conectado" : oauthReady ? "Aguardando autorizacao" : "Nao configurado"}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-black/10 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Ultima atualizacao</p>
              <p className="mt-3 text-sm font-medium text-white/82">
                {melhorEnvioToken ? formatDate(melhorEnvioToken.updatedAt) : "Sem token salvo"}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-black/10 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Expiracao prevista</p>
              <p className="mt-3 text-sm font-medium text-white/82">
                {melhorEnvioToken?.expiresAt ? formatDate(melhorEnvioToken.expiresAt) : "Renovada automaticamente quando possivel"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </BeArtShell>
  );
}