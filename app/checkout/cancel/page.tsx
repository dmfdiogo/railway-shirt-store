export default function CheckoutCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f3ded3_0%,#f4ecdf_100%)] px-6 py-12 text-stone-950">
      <section className="w-full max-w-2xl rounded-[2rem] border border-stone-950/10 bg-white/85 p-8 shadow-[0_24px_80px_rgba(66,45,25,0.14)] backdrop-blur sm:p-10">
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-stone-500">Checkout cancelado</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          Nenhuma cobrança foi confirmada.
        </h1>
        <p className="mt-6 text-lg leading-8 text-stone-700">
          O usuário voltou do Stripe sem concluir o pagamento. Isso preserva o fluxo e permite tentar novamente sem mexer no backend.
        </p>
        <a
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
          href="/"
        >
          Tentar novamente
        </a>
      </section>
    </main>
  );
}