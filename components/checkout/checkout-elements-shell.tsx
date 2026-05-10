"use client";

import type { Appearance } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AlertTriangle, ArrowRight, CreditCard, Mail, MapPin, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type CheckoutActions = {
  confirm: (args?: { returnUrl?: string; redirect?: "always" | "if_required" }) => Promise<
    | {
        type: "success";
        session: { status: { type: "open" | "expired" | "complete"; paymentStatus?: string } };
      }
    | { type: "error"; error: { message: string } }
  >;
  getSession: () => {
    canConfirm: boolean;
    currency: string;
    email: string | null;
    minorUnitsAmountDivisor: number;
    status: { type: "open" | "expired" | "complete"; paymentStatus?: string };
    total: {
      total: {
        minorUnitsAmount: number;
        amount: string;
      };
    };
  };
};

type CheckoutElementsShellProps = {
  clientSecret: string;
  publishableKey: string;
  sessionId: string;
};

const checkoutAppearance: Appearance = {
  theme: "night",
  variables: {
    colorPrimary: "#6B3CF6",
    colorBackground: "#10131D",
    colorText: "#F5F7FB",
    colorTextSecondary: "rgba(226, 232, 240, 0.72)",
    colorTextPlaceholder: "rgba(203, 213, 225, 0.48)",
    buttonColorBackground: "#6B3CF6",
    buttonColorText: "#FFFFFF",
    fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif',
    fontSizeBase: "15px",
    spacingUnit: "6px",
  },
};

function formatCheckoutTotal({
  currency,
  divisor,
  minorUnitsAmount,
}: {
  currency: string;
  divisor: number;
  minorUnitsAmount: number;
}) {
  const normalizedDivisor = divisor > 0 ? divisor : 100;
  const amount = minorUnitsAmount / normalizedDivisor;

  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  } catch {
    return `R$ ${amount.toFixed(2).replace(".", ",")}`;
  }
}

export function CheckoutElementsShell({
  clientSecret,
  publishableKey,
  sessionId,
}: CheckoutElementsShellProps) {
  const router = useRouter();
  const actionsRef = useRef<CheckoutActions | null>(null);
  const hasRedirectedRef = useRef(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const shippingRef = useRef<HTMLDivElement | null>(null);
  const paymentRef = useRef<HTMLDivElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);
  const [totalLabel, setTotalLabel] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let cleanup: (() => void) | undefined;

    async function mountCheckout() {
      const stripe = await loadStripe(publishableKey);

      if (!stripe) {
        throw new Error("Nao foi possivel inicializar o Stripe.js.");
      }

      const checkout = stripe.initCheckoutElementsSdk({
        clientSecret,
        elementsOptions: {
          appearance: checkoutAppearance,
          loader: "auto",
        },
      });

      const loadResult = await checkout.loadActions();

      if (loadResult.type === "error") {
        throw new Error(loadResult.error.message || "Nao foi possivel carregar o checkout.");
      }

      const { actions } = loadResult;
      const syncSession = () => {
        const nextSession = actions.getSession();
        if (!active) return;

        if (nextSession.status.type === "complete" && !hasRedirectedRef.current) {
          hasRedirectedRef.current = true;
          router.push(`/checkout/success?session_id=${encodeURIComponent(sessionId)}`);
          return;
        }

        setCanConfirm(nextSession.canConfirm);
        setTotalLabel(
          formatCheckoutTotal({
            currency: nextSession.currency,
            divisor: nextSession.minorUnitsAmountDivisor,
            minorUnitsAmount: nextSession.total.total.minorUnitsAmount,
          })
        );
      };

      const initialSession = actions.getSession();
      const contactElement = checkout.createContactDetailsElement(
        initialSession.email
          ? {
              defaultValues: {
                email: initialSession.email,
              },
            }
          : undefined
      );
      const shippingElement = checkout.createShippingAddressElement({
        display: {
          name: "full",
        },
      });
      const paymentElement = checkout.createPaymentElement();

      if (!active || !contactRef.current || !shippingRef.current || !paymentRef.current) {
        contactElement.destroy();
        shippingElement.destroy();
        paymentElement.destroy();
        return;
      }

      contactElement.mount(contactRef.current);
      shippingElement.mount(shippingRef.current);
      paymentElement.mount(paymentRef.current);

      checkout.on("change", syncSession);
      actionsRef.current = actions as CheckoutActions;
      syncSession();
      cleanup = () => {
        contactElement.destroy();
        shippingElement.destroy();
        paymentElement.destroy();
        actionsRef.current = null;
      };
      setIsReady(true);
    }

    mountCheckout().catch((error) => {
      if (!active) return;
      const message = error instanceof Error ? error.message : "Nao foi possivel abrir o checkout.";
      setErrorMessage(message);
    });

    return () => {
      active = false;
      cleanup?.();
    };
  }, [clientSecret, publishableKey, router, sessionId]);

  async function handleConfirm() {
    const actions = actionsRef.current;

    if (!actions || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await actions.confirm({
        redirect: "if_required",
      });

      if (result.type === "error") {
        setErrorMessage(result.error.message);
        return;
      }

      if (result.session.status.type === "complete") {
        router.push(`/checkout/success?session_id=${encodeURIComponent(sessionId)}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Nao foi possivel confirmar o pagamento.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(circle_at_top,rgba(107,60,246,0.16),transparent_26%),linear-gradient(180deg,rgba(13,14,19,0.96),rgba(13,14,19,0.84))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6">
      {!isReady ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-[#0D0E13]/92 text-center text-white/62">
          <RefreshCw className="h-5 w-5 animate-spin text-[#A5ADFF]" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A5ADFF]">
              Preparando pagamento
            </p>
            <p className="mt-2 text-sm leading-7 text-white/52">
              Montando os componentes seguros do Stripe dentro da Be Art.
            </p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-white/[0.08] bg-white/[0.03] px-5 py-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A5ADFF]">
            Checkout personalizado
          </p>
          <p className="mt-2 text-sm leading-7 text-white/62">
            Email, entrega e pagamento agora usam Elements com tema da Be Art.
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-[#11131b] px-4 py-2 text-sm font-semibold text-white">
          {totalLabel ? `Total ${totalLabel}` : "Calculando total"}
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="space-y-5">
          <section className="rounded-[1.6rem] border border-white/[0.08] bg-[#11131b] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-3 text-white">
              <Mail className="h-4 w-4 text-[#A5ADFF]" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Contato</h2>
                <p className="mt-1 text-sm leading-6 text-white/52">Email usado no recibo e nas atualizações do pedido.</p>
              </div>
            </div>
            <div ref={contactRef} className="mt-4" />
          </section>

          <section className="rounded-[1.6rem] border border-white/[0.08] bg-[#11131b] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-3 text-white">
              <MapPin className="h-4 w-4 text-[#A5ADFF]" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Entrega</h2>
                <p className="mt-1 text-sm leading-6 text-white/52">O frete calculado no carrinho continua vinculado a esta sessão.</p>
              </div>
            </div>
            <div ref={shippingRef} className="mt-4" />
          </section>
        </div>

        <div className="rounded-[1.6rem] border border-white/[0.08] bg-[#11131b] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-3 text-white">
            <CreditCard className="h-4 w-4 text-[#A5ADFF]" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Pagamento</h2>
              <p className="mt-1 text-sm leading-6 text-white/52">Cartão e métodos compatíveis seguem protegidos pela infraestrutura do Stripe.</p>
            </div>
          </div>

          <div ref={paymentRef} className="mt-4" />

          {errorMessage ? (
            <div className="mt-4 rounded-[1.2rem] border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-50/90">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!isReady || !canConfirm || isSubmitting}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.24)] transition disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Confirmando pagamento
                </>
              ) : (
                <>
                  Pagar agora
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>

            <Link
              href="/cart"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-6 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              Voltar ao carrinho
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}