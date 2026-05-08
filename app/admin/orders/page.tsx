import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { BeArtShell } from "@/components/ui/beart-shell";
import { auth, isAuthConfigured } from "@/lib/auth";
import {
  getOrderReferenceDate,
  getPaymentStatusMeta,
  getPrimaryOrderStatusMeta,
} from "@/lib/order-status";
import {
  canManageOrders,
  isOrderOperatorRestrictionEnabled,
} from "@/lib/orders";
import prisma from "@/lib/prisma";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Admin de pedidos — Be Art",
  description: "Painel interno para acompanhar pedidos e atualizar o fluxo logístico manual da Be Art.",
  path: "/admin/orders",
});

function formatOrderDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function getFeedback(params: { updated?: string; emailed?: string; emailFailed?: string; error?: string }) {
  if (params.error) {
    return {
      className: "border-red-400/20 bg-red-500/12 text-red-100",
      message: params.error,
    };
  }

  if (params.updated) {
    const suffix = params.emailed === "1"
      ? " O email de envio também foi disparado."
      : params.emailFailed === "1"
        ? " O status foi salvo, mas o email de envio falhou."
        : "";

    return {
      className: "border-emerald-400/20 bg-emerald-500/12 text-emerald-100",
      message: `Pedido ${params.updated} atualizado com sucesso.${suffix}`,
    };
  }

  return null;
}

function getNextFulfillmentAction(status: string) {
  switch (status) {
    case "pending":
      return { label: "Iniciar preparação", value: "processing" };
    case "processing":
      return { label: "Marcar como enviado", value: "shipped" };
    case "shipped":
      return { label: "Marcar como entregue", value: "delivered" };
    default:
      return null;
  }
}

function getTrackingFormValues(order: { trackingCode: string | null; trackingUrl: string | null }) {
  return {
    trackingCode: order.trackingCode ?? "",
    trackingUrl: order.trackingUrl ?? "",
  };
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string; emailed?: string; emailFailed?: string; error?: string }>;
}) {
  if (!isAuthConfigured()) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  if (!session) {
    redirect("/sign-in?redirectTo=%2Fadmin%2Forders");
  }

  if (!canManageOrders(session.user.email)) {
    notFound();
  }

  const params = await searchParams;
  const feedback = getFeedback(params);
  const restrictionEnabled = isOrderOperatorRestrictionEnabled();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      items: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          quantity: true,
          sku: true,
        },
      },
    },
  });

  return (
    <BeArtShell authReady footer navbar sessionActive contentClassName="relative px-6 pb-12 pt-28 sm:px-10 lg:px-16">
      <section className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">Admin</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">Operação de pedidos</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
              Painel manual para avançar o fluxo logístico dos pedidos pagos enquanto a operação ainda está em modo low budget.
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
          <div className={`mt-8 rounded-[1.3rem] border px-5 py-4 text-sm leading-7 ${feedback.className}`}>
            {feedback.message}
          </div>
        ) : null}

        {!restrictionEnabled ? (
          <div className="mt-8 rounded-[1.3rem] border border-amber-400/20 bg-amber-500/12 px-5 py-4 text-sm leading-7 text-amber-100">
            Este ambiente está com acesso aberto ao painel de pedidos. Defina <strong>ORDER_OPERATOR_EMAILS</strong> para limitar quem pode operar pedidos.
          </div>
        ) : null}

        <div className="mt-10 space-y-4">
          {orders.map((order) => {
            const primaryStatusMeta = getPrimaryOrderStatusMeta({
              fulfillmentStatus: order.fulfillmentStatus,
              paymentStatus: order.paymentStatus,
            });
            const paymentMeta = getPaymentStatusMeta(order.paymentStatus);
            const nextAction = getNextFulfillmentAction(order.fulfillmentStatus);
            const referenceDate = getOrderReferenceDate(order);
            const visibleItems = order.items.filter((item) => !(item.sku?.startsWith("shipping:") ?? false));

            return (
              <article key={order.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-mono uppercase tracking-[0.24em] text-white/42">
                      Pedido {order.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {formatPrice(order.totalAmount, order.currency)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/58">
                      {order.email ?? "Sem email associado"} · {formatOrderDate(referenceDate)}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/56">{primaryStatusMeta.description}</p>
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end">
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${primaryStatusMeta.badgeClassName}`}>
                        {primaryStatusMeta.label}
                      </span>
                      <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${paymentMeta.badgeClassName}`}>
                        {paymentMeta.label}
                      </span>
                    </div>

                    {nextAction && order.paymentStatus === "paid" ? (
                      <form action="/admin/orders/update" method="post">
                        <input type="hidden" name="orderId" value={order.id} />
                        <input type="hidden" name="fulfillmentStatus" value={nextAction.value} />
                        <button
                          type="submit"
                          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-5 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5"
                        >
                          {nextAction.label}
                        </button>
                      </form>
                    ) : (
                      <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/52">
                        Sem ação manual pendente
                      </div>
                    )}
                  </div>
                </div>

                {visibleItems.length > 0 ? (
                  <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-black/10 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Itens</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/68">
                      {visibleItems.map((item) => (
                        <li key={item.id} className="flex items-center justify-between gap-4">
                          <span>{item.name}</span>
                          <span className="text-white/48">Qtd {item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {(() => {
                  const trackingValues = getTrackingFormValues(order);

                  return (
                    <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-black/10 px-4 py-4">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Rastreio manual</p>
                      <form action="/admin/orders/tracking" method="post" className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
                        <input type="hidden" name="orderId" value={order.id} />
                        <label className="block text-sm font-medium text-white/72">
                          Código de rastreio
                          <input
                            name="trackingCode"
                            type="text"
                            defaultValue={trackingValues.trackingCode}
                            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45 focus:bg-white/[0.07]"
                            placeholder="AA123456789BR"
                          />
                        </label>
                        <label className="block text-sm font-medium text-white/72">
                          URL de rastreio
                          <input
                            name="trackingUrl"
                            type="url"
                            defaultValue={trackingValues.trackingUrl}
                            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45 focus:bg-white/[0.07]"
                            placeholder="https://..."
                          />
                        </label>
                        <button
                          type="submit"
                          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-medium text-white/82 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                        >
                          Salvar rastreio
                        </button>
                      </form>
                    </div>
                  );
                })()}
              </article>
            );
          })}
        </div>
      </section>
    </BeArtShell>
  );
}