import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ProfileSettingsForm } from "@/components/account/profile-settings-form";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { BeArtShell } from "@/components/ui/beart-shell";
import { auth, isAuthConfigured } from "@/lib/auth";
import {
  getOrderTimeline,
  getOrderReferenceDate,
  getPaymentStatusMeta,
  getPrimaryOrderStatusMeta,
} from "@/lib/order-status";
import { canManageOrders } from "@/lib/orders";
import prisma from "@/lib/prisma";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNoIndexMetadata({
  title: "Minha conta — Be Art",
  description: "Acompanhe pedidos, sessão e dados de entrega da sua conta Be Art.",
  path: "/account",
});

type AccountProfileSnapshot = {
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  country: string | null;
  emailVerified: boolean;
  neighborhood: string | null;
  phone: string | null;
  postalCode: string | null;
  state: string | null;
};

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatOrderDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function isShippingItem(sku: string | null) {
  return sku?.startsWith("shipping:") ?? false;
}

function getOrderItemDisplayName(item: {
  name: string;
  productVariant: { product: { name: string; slug: string } | null } | null;
}) {
  const product = item.productVariant?.product;
  if (!product) return item.name;

  const normalizedItemName = item.name.trim().toLowerCase();
  const normalizedProductName = product.name.trim().toLowerCase();

  if (!normalizedItemName || normalizedItemName === normalizedProductName) {
    return product.name;
  }

  if (normalizedItemName.includes(normalizedProductName)) {
    return item.name;
  }

  return `${product.name} · ${item.name}`;
}

function getShippingSummary(order: {
  shippingAmount: number;
  shippingCarrierName: string | null;
  shippingDeliveryWindowLabel: string | null;
  shippingServiceName: string | null;
  trackingCode: string | null;
  trackingUrl: string | null;
}) {
  const serviceParts = [order.shippingCarrierName, order.shippingServiceName].filter(Boolean);

  return {
    amount: order.shippingAmount,
    label: serviceParts.join(" · ") || "Frete",
    deliveryWindowLabel: order.shippingDeliveryWindowLabel,
    trackingCode: order.trackingCode,
    trackingUrl: order.trackingUrl,
  };
}

function getTimelineTone(state: "done" | "current" | "pending") {
  switch (state) {
    case "done":
      return "border-emerald-400/70 text-emerald-50";
    case "current":
      return "border-sky-400/70 text-sky-50";
    default:
      return "border-white/18 text-white/62";
  }
}

function hasSavedDeliveryProfile(profile: AccountProfileSnapshot | null) {
  return Boolean(profile?.addressLine1 && profile?.postalCode && profile?.city && profile?.state);
}

function getDeliveryProfileLabel(profile: AccountProfileSnapshot | null) {
  if (!profile) return "Perfil indisponível";

  const location = [profile.city, profile.state].filter(Boolean).join(" · ");

  if (location) return location;
  if (profile.addressLine1 || profile.postalCode || profile.country) return "Dados de entrega em andamento";

  return "Nenhum endereço salvo";
}

export default async function AccountPage({
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  if (!isAuthConfigured()) {
    return (
      <BeArtShell authReady={false} contentClassName="relative flex min-h-screen items-center justify-center px-6 py-12" footer>
        <section className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">Conta indisponível</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
            A área de conta depende da configuração de autenticação.
          </h1>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5"
          >
            Voltar para a loja
          </Link>
        </section>
      </BeArtShell>
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  }).catch(() => null);

  if (!session) {
    redirect("/sign-in");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      addressLine1: true,
      addressLine2: true,
      city: true,
      country: true,
      emailVerified: true,
      neighborhood: true,
      phone: true,
      postalCode: true,
      state: true,
    },
  });

  const orderAccessWhere = currentUser?.emailVerified
    ? {
        OR: [
          { userId: session.user.id },
          { userId: null, email: session.user.email },
        ],
      }
    : {
        userId: session.user.id,
      };

  const orders = await prisma.order.findMany({
    where: orderAccessWhere,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          productVariant: {
            include: {
              product: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const canManageAdminOrders = canManageOrders(session.user.email);
  const paidOrders = orders.filter((order) => order.paymentStatus === "paid");
  const activeOrders = orders.filter(
    (order) => order.paymentStatus === "paid" && !["delivered", "returned", "canceled"].includes(order.fulfillmentStatus)
  ).length;
  const totalPaidAmount = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const latestOrderTimestamp = orders[0] ? getOrderReferenceDate(orders[0]) : null;
  const deliveryProfileReady = hasSavedDeliveryProfile(currentUser);
  const deliveryProfileLabel = getDeliveryProfileLabel(currentUser);

  return (
    <BeArtShell authReady footer navbar sessionActive contentClassName="relative px-6 pb-12 pt-28 sm:px-10 lg:px-16">
        <section className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,19,28,0.94)_0%,rgba(11,12,19,0.98)_100%)] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-10">
        <div className="absolute inset-x-6 top-6 h-24 rounded-full bg-[radial-gradient(circle,rgba(82,110,255,0.18)_0%,rgba(82,110,255,0)_68%)] blur-3xl sm:inset-x-12" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
          <div>
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#A5ADFF]">Minha conta</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
              {session.user.name || "Cliente"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
              Seus pedidos, comprovantes e dados de entrega ficam organizados aqui, sem depender de buscas manuais no email.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/48">
              {session.user.email}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/72">
                {currentUser?.emailVerified ? "Email verificado" : "Email pendente"}
              </div>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/72">
                {deliveryProfileReady ? "Entrega pronta para checkout" : "Entrega precisa de revisão"}
              </div>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/72">
                {activeOrders > 0 ? `${activeOrders} pedido${activeOrders > 1 ? "s" : ""} em andamento` : "Nenhum pedido em andamento"}
              </div>
            </div>
          </div>

          <div className="relative rounded-[1.4rem] border border-white/10 bg-black/10 px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Atalhos</p>
            <p className="mt-3 text-sm leading-6 text-white/58">
              Ações rápidas para navegar, operar pedidos e encerrar a sessão com clareza.
            </p>
            <div className="mt-5 flex flex-col gap-3">
            {canManageAdminOrders ? (
              <Link
                href="/admin/orders"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-medium text-white/82 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                Operar pedidos
              </Link>
            ) : null}
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5"
            >
              Voltar para a loja
            </Link>
            <SignOutButton />
          </div>
        </div>
        </div>

        <div className="mt-8 grid overflow-hidden rounded-[1.3rem] border border-white/10 bg-white/[0.03] sm:grid-cols-2 xl:grid-cols-4">
          <div className="px-4 py-4 xl:border-r xl:border-white/10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Entrega</p>
            <p className="mt-3 text-base font-semibold text-white">{deliveryProfileReady ? "Perfil pronto" : "Perfil incompleto"}</p>
            <p className="mt-1 text-sm leading-6 text-white/56">{deliveryProfileLabel}</p>
          </div>
          <div className="border-t border-white/10 px-4 py-4 sm:border-l sm:border-t-0 sm:border-white/10 xl:border-r">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Pedidos em andamento</p>
            <p className="mt-3 text-base font-semibold text-white">{activeOrders}</p>
            <p className="mt-1 text-sm leading-6 text-white/56">
              {activeOrders > 0 ? "Acompanhando pagamentos e logística ativos." : "Nenhum pedido aberto no momento."}
            </p>
          </div>
          <div className="border-t border-white/10 px-4 py-4 xl:border-r xl:border-white/10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Total pago</p>
            <p className="mt-3 text-base font-semibold text-white">{formatPrice(totalPaidAmount, orders[0]?.currency ?? "BRL")}</p>
            <p className="mt-1 text-sm leading-6 text-white/56">Soma dos pedidos confirmados desta conta.</p>
          </div>
          <div className="border-t border-white/10 px-4 py-4 sm:border-l sm:border-t-0 sm:border-white/10 xl:border-l-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Última movimentação</p>
            <p className="mt-3 text-base font-semibold text-white">
              {latestOrderTimestamp ? formatOrderDate(latestOrderTimestamp) : "Sem pedidos processados"}
            </p>
            <p className="mt-1 text-sm leading-6 text-white/56">Atualização mais recente ligada ao seu histórico.</p>
          </div>
        </div>

        <ProfileSettingsForm
          initialValues={{
            addressLine1: currentUser?.addressLine1 ?? null,
            addressLine2: currentUser?.addressLine2 ?? null,
            city: currentUser?.city ?? null,
            country: currentUser?.country ?? null,
            neighborhood: currentUser?.neighborhood ?? null,
            phone: currentUser?.phone ?? null,
            postalCode: currentUser?.postalCode ?? null,
            state: currentUser?.state ?? null,
          }}
        />

        <div className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-[#A5ADFF]">Pedidos</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/56">
                Consulte andamento, itens comprados, rastreio e comprovantes sem navegar por várias telas.
              </p>
            </div>
          </div>
          {orders.length === 0 ? (
            <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/36">Historico vazio</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
                Ainda não encontramos pedidos associados a esta conta. Assim que um checkout for concluido, o resumo da compra aparece aqui com status e itens.
              </p>
              <Link
                href="/shop"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white/76 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Explorar coleção
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="grid overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.03] md:grid-cols-3">
                <div className="px-4 py-4 md:border-r md:border-white/10">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Pedidos registrados</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{orders.length}</p>
                </div>
                <div className="border-t border-white/10 px-4 py-4 md:border-r md:border-t-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Total pago</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{formatPrice(totalPaidAmount, orders[0].currency)}</p>
                </div>
                <div className="border-t border-white/10 px-4 py-4 md:border-t-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Ultima atualização</p>
                  <p className="mt-3 text-sm font-medium text-white/82">
                    {latestOrderTimestamp ? formatOrderDate(latestOrderTimestamp) : "Sem pedidos processados"}
                  </p>
                </div>
              </div>

              {orders.map((order) => (
                <article key={order.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-5">
                  {(() => {
                    const paymentMeta = getPaymentStatusMeta(order.paymentStatus);
                    const statusMeta = getPrimaryOrderStatusMeta({
                      fulfillmentStatus: order.fulfillmentStatus,
                      paymentStatus: order.paymentStatus,
                    });
                    const shippingSummary = getShippingSummary(order);
                    const timeline = getOrderTimeline(order);
                    const productItems = order.items.filter((item) => !isShippingItem(item.sku));
                    const referenceDate = getOrderReferenceDate(order);

                    return (
                      <>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-sm font-mono uppercase tracking-[0.24em] text-white/42">
                              Pedido {order.id.slice(-8).toUpperCase()}
                            </p>
                            <p className="mt-2 text-xl font-semibold text-white">
                              {formatPrice(order.totalAmount, order.currency)}
                            </p>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-white/56">{statusMeta.description}</p>
                          </div>

                          <div className="flex flex-col gap-2 text-sm text-white/58 sm:items-end">
                            <div className="flex flex-wrap gap-2 sm:justify-end">
                              <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${statusMeta.badgeClassName}`}>
                                {statusMeta.label}
                              </span>
                              {order.paymentStatus === "paid" ? (
                                <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${paymentMeta.badgeClassName}`}>
                                  {paymentMeta.label}
                                </span>
                              ) : null}
                            </div>
                            <span>{formatOrderDate(referenceDate)}</span>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
                          <div>
                            <div className="overflow-hidden rounded-[1.1rem] border border-white/10 bg-black/10">
                              {productItems.map((item, index) => {
                                const productSlug = item.productVariant?.product?.slug;
                                const itemLabel = getOrderItemDisplayName(item);

                                return (
                                  <div
                                    key={item.id}
                                    className={`px-4 py-4 ${index > 0 ? "border-t border-white/10" : ""}`}
                                  >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                      <div>
                                        <p className="text-sm font-medium text-white">{itemLabel}</p>
                                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/38">
                                          Quantidade {item.quantity}
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-3">
                                        {productSlug ? (
                                          <Link
                                            href={`/shop/${productSlug}`}
                                            className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-transparent px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/64 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                                          >
                                            Ver peça
                                          </Link>
                                        ) : null}
                                        <span className="text-sm font-semibold text-white">
                                          {formatPrice(item.totalAmount, order.currency)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-5">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Resumo</p>
                            <dl className="mt-4 space-y-3 text-sm text-white/62">
                              <div className="flex items-center justify-between gap-3">
                                <dt>Produtos</dt>
                                <dd>{formatPrice(order.subtotalAmount, order.currency)}</dd>
                              </div>
                              <div className="flex items-center justify-between gap-3">
                                <dt>{shippingSummary.label}</dt>
                                <dd>
                                  {shippingSummary.amount > 0
                                    ? formatPrice(shippingSummary.amount, order.currency)
                                    : "Incluído"}
                                </dd>
                              </div>
                              {shippingSummary.deliveryWindowLabel ? (
                                <div className="flex items-center justify-between gap-3">
                                  <dt>Prazo estimado</dt>
                                  <dd>{shippingSummary.deliveryWindowLabel}</dd>
                                </div>
                              ) : null}
                              {shippingSummary.trackingCode ? (
                                <div className="flex items-start justify-between gap-3">
                                  <dt>Rastreio</dt>
                                  <dd className="text-right">
                                    <span className="block">{shippingSummary.trackingCode}</span>
                                    {shippingSummary.trackingUrl ? (
                                      <a
                                        href={shippingSummary.trackingUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-1 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-[#A5ADFF] hover:text-white"
                                      >
                                        Abrir rastreio
                                      </a>
                                    ) : null}
                                  </dd>
                                </div>
                              ) : null}
                              <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-base font-semibold text-white">
                                <dt>Total</dt>
                                <dd>{formatPrice(order.totalAmount, order.currency)}</dd>
                              </div>
                            </dl>

                            {order.paymentStatus === "paid" ? (
                              <Link
                                href={`/account/orders/${order.id}/receipt`}
                                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/72 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                              >
                                Baixar comprovante
                              </Link>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-5">
                          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Linha do tempo</p>
                          <ol className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                            {timeline.map((step) => (
                              <li
                                key={step.key}
                                className={`border-l-2 pl-4 ${getTimelineTone(step.state)}`}
                              >
                                <p className="text-[10px] uppercase tracking-[0.22em] text-current/70">{step.label}</p>
                                <p className="mt-2 text-sm font-semibold text-current">
                                  {step.date ? formatOrderDate(step.date) : "Aguardando"}
                                </p>
                                <p className="mt-2 text-xs leading-5 text-current/75">{step.description}</p>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </>
                    );
                  })()}
                </article>
              ))}
            </div>
          )}
        </div>
        </section>
    </BeArtShell>
  );
}