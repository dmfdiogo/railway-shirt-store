export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#fdf2cc_0%,#f4ecdf_100%)] px-6 py-12 text-stone-950">
      <section className="w-full max-w-2xl rounded-[2rem] border border-stone-950/10 bg-white/85 p-8 shadow-[0_24px_80px_rgba(66,45,25,0.18)] backdrop-blur sm:p-10">
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">Pagamento recebido</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          O checkout foi concluído.
        </h1>
        <p className="mt-6 text-lg leading-8 text-stone-700">
          O Stripe já redirecionou o cliente de volta e o backend está pronto para processar a confirmação definitiva pelo webhook.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
            href="/"
          >
            Voltar para a loja
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-950/10 px-6 text-sm font-medium text-stone-700 transition hover:bg-stone-950/5"
            href="https://dashboard.stripe.com/test/payments"
            target="_blank"
            rel="noreferrer"
          >
            Ver pagamentos no Stripe
          </a>
        </div>
      </section>
    </main>
  );
}