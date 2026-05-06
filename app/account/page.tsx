import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { auth, isAuthConfigured } from "@/lib/auth";
import prisma from "@/lib/prisma";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function AccountPage() {
  if (!isAuthConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f2e5d5_0%,#eadbc8_100%)] px-6 py-12 text-stone-950">
        <section className="w-full max-w-2xl rounded-[2rem] border border-stone-950/10 bg-white/90 p-8 shadow-[0_24px_70px_rgba(44,32,18,0.14)] backdrop-blur sm:p-10">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">Conta indisponível</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            A área de conta depende da configuração de autenticação.
          </h1>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
          >
            Voltar para a loja
          </Link>
        </section>
      </main>
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const orders = await prisma.order.findMany({
    where: {
      OR: [
        { userId: session.user.id },
        { email: session.user.email },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f2e5d5_0%,#eadbc8_100%)] px-6 py-12 text-stone-950">
      <section className="mx-auto w-full max-w-4xl rounded-[2rem] border border-stone-950/10 bg-white/90 p-8 shadow-[0_24px_70px_rgba(44,32,18,0.14)] backdrop-blur sm:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">Minha conta</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
              {session.user.name || "Cliente"}
            </h1>
            <p className="mt-4 text-base leading-7 text-stone-700">
              {session.user.email}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
            >
              Voltar para a loja
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-stone-950/10 bg-stone-50 px-5 py-5">
          <p className="text-sm font-mono uppercase tracking-[0.28em] text-stone-500">Pedidos</p>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Ainda não encontramos pedidos associados a esta conta.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-[1.5rem] border border-stone-950/10 bg-white px-5 py-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-mono uppercase tracking-[0.24em] text-stone-500">
                        Pedido {order.id.slice(-8)}
                      </p>
                      <p className="mt-2 text-base font-medium text-stone-900">
                        {formatPrice(order.totalAmount, order.currency)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm text-stone-600 sm:items-end">
                      <span className="rounded-full border border-stone-950/10 bg-stone-50 px-3 py-1 uppercase tracking-[0.2em] text-[11px] text-stone-700">
                        {order.status}
                      </span>
                      <span>{order.createdAt.toLocaleString("pt-BR")}</span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm leading-6 text-stone-700">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-4">
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span>{formatPrice(item.totalAmount, order.currency)}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}