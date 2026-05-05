import { connection } from "next/server";

const requiredStripeEnv = [
  "STRIPE_SECRET_KEY",
  "STRIPE_PRICE_ID",
  "STRIPE_WEBHOOK_SECRET",
];

export default async function Home() {
  await connection();

  const stripeReady = requiredStripeEnv.every((key) => Boolean(process.env[key]));

  return (
    <main className="relative flex flex-1 overflow-hidden bg-[radial-gradient(circle_at_top,#ffd36d_0%,#f6efe4_26%,#efe3ce_56%,#d8c3a5_100%)] px-6 py-10 text-stone-950 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(124,58,237,0.06),transparent_42%),linear-gradient(225deg,rgba(15,23,42,0.10),transparent_35%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
        <section className="flex-1 rounded-[2rem] border border-stone-950/10 bg-[#fff7ea]/90 p-8 shadow-[0_30px_80px_rgba(79,54,31,0.18)] backdrop-blur sm:p-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-mono uppercase tracking-[0.35em] text-stone-500">
                Railway Shirt Store
              </p>
              <h1 className="mt-3 max-w-2xl text-5xl font-semibold leading-none tracking-[-0.06em] sm:text-6xl">
                Checkout pronto para deploy no Railway com Stripe no servidor.
              </h1>
            </div>
            <div className="hidden rounded-full border border-stone-950/10 bg-stone-950 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-stone-50 lg:block">
              {stripeReady ? "Stripe armado" : "Falta configurar Stripe"}
            </div>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-stone-700">
            Este app já usa Checkout Sessions e webhook server-side. Sem banco por enquanto, com o catálogo apontando para um preço hospedado no Stripe via <strong>STRIPE_PRICE_ID</strong>.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-stone-950/10 bg-white/80 p-5">
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-stone-500">Deploy</p>
              <p className="mt-3 text-base leading-7 text-stone-700">
                Projeto Railway criado e pronto para receber o serviço web desta aplicação.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-950/10 bg-white/80 p-5">
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-stone-500">Payments</p>
              <p className="mt-3 text-base leading-7 text-stone-700">
                A compra redireciona para o Stripe Checkout e o webhook confirma o evento no backend.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-950/10 bg-white/80 p-5">
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-stone-500">Catálogo</p>
              <p className="mt-3 text-base leading-7 text-stone-700">
                O preço do produto fica no Stripe agora; persistência e banco entram depois, quando fizer sentido.
              </p>
            </article>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <form action="/api/checkout-session" method="POST">
              <button
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-stone-950 px-8 text-base font-medium text-stone-50 transition hover:-translate-y-0.5 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
                type="submit"
                disabled={!stripeReady}
              >
                Comprar via Stripe Checkout
              </button>
            </form>
            <p className="max-w-md text-sm leading-6 text-stone-600">
              {stripeReady
                ? "O botão já cria uma Checkout Session no backend. Defina o preço no Stripe e o app passa a vender."
                : "Defina as variáveis STRIPE_SECRET_KEY, STRIPE_PRICE_ID e STRIPE_WEBHOOK_SECRET para habilitar a compra."}
            </p>
          </div>
        </section>

        <aside className="w-full max-w-xl rounded-[2rem] border border-stone-950/10 bg-stone-950 p-8 text-stone-50 shadow-[0_24px_70px_rgba(24,24,27,0.28)] sm:p-10">
          <p className="text-sm font-mono uppercase tracking-[0.35em] text-amber-300/80">
            Runtime Checklist
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-300">
            {requiredStripeEnv.map((envName) => (
              <li
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                key={envName}
              >
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-stone-300">
                  {envName}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-200">
                  {process.env[envName] ? "ok" : "missing"}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[1.5rem] bg-amber-300 px-5 py-5 text-stone-950">
            <p className="text-sm font-mono uppercase tracking-[0.28em]">Fluxo atual</p>
            <ol className="mt-4 space-y-3 text-sm leading-6">
              <li>1. O botão faz POST para a rota server-side que cria a sessão no Stripe.</li>
              <li>2. O Stripe hospeda a tela de pagamento e devolve para sucesso ou cancelamento.</li>
              <li>3. O webhook recebe o evento final para fulfillment futuro.</li>
            </ol>
          </div>
        </aside>
      </div>
    </main>
  );
}
