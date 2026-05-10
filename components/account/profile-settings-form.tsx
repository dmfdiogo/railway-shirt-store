"use client";

import { CheckCircle2, CircleAlert, MapPin, Phone, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { updateUser } from "@/lib/auth-client";

type ProfileSettingsFormProps = {
  initialValues: {
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    country: string | null;
    neighborhood: string | null;
    phone: string | null;
    postalCode: string | null;
    state: string | null;
  };
};

function normalizeOptionalField(value: FormDataEntryValue | null) {
  const normalized = String(value ?? "").trim();
  return normalized.length > 0 ? normalized : null;
}

export function ProfileSettingsForm({ initialValues }: ProfileSettingsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const profileUpdate = {
        addressLine1: normalizeOptionalField(formData.get("addressLine1")),
        addressLine2: normalizeOptionalField(formData.get("addressLine2")),
        city: normalizeOptionalField(formData.get("city")),
        country: normalizeOptionalField(formData.get("country")),
        neighborhood: normalizeOptionalField(formData.get("neighborhood")),
        phone: normalizeOptionalField(formData.get("phone")),
        postalCode: normalizeOptionalField(formData.get("postalCode")),
        state: normalizeOptionalField(formData.get("state")),
      } as Parameters<typeof updateUser>[0];

      const result = await updateUser(profileUpdate);

      if (result.error) {
        setError(result.error.message || "Nao foi possivel salvar o endereco.");
        return;
      }

      setSuccess("Endereco salvo na sua conta.");
      router.refresh();
    });
  }

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-5">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div className="lg:pt-2">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              Contato
            </p>
            <p className="mt-3 text-sm leading-6 text-white/56">
              Usado em suporte, confirmação de entrega e recuperação rápida do pedido.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-white/72 sm:col-span-2">
              Telefone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                defaultValue={initialValues.phone ?? ""}
                className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45"
                placeholder="(11) 99999-9999"
              />
            </label>
          </div>

          <div className="border-t border-white/10 pt-8 lg:pt-2">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Endereço
            </p>
            <p className="mt-3 text-sm leading-6 text-white/56">
              Salve o básico do destino para reduzir preenchimento repetido no checkout.
            </p>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-white/72 sm:col-span-2">
                Endereço
                <input
                  name="addressLine1"
                  type="text"
                  autoComplete="address-line1"
                  defaultValue={initialValues.addressLine1 ?? ""}
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45"
                  placeholder="Rua, numero e complemento principal"
                />
              </label>

              <label className="block text-sm font-medium text-white/72 sm:col-span-2">
                Complemento
                <input
                  name="addressLine2"
                  type="text"
                  autoComplete="address-line2"
                  defaultValue={initialValues.addressLine2 ?? ""}
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45"
                  placeholder="Apartamento, bloco ou referência"
                />
              </label>

              <label className="block text-sm font-medium text-white/72">
                Bairro
                <input
                  name="neighborhood"
                  type="text"
                  defaultValue={initialValues.neighborhood ?? ""}
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45"
                  placeholder="Centro"
                />
              </label>

              <label className="block text-sm font-medium text-white/72">
                CEP
                <input
                  name="postalCode"
                  type="text"
                  autoComplete="postal-code"
                  defaultValue={initialValues.postalCode ?? ""}
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45"
                  placeholder="00000-000"
                />
              </label>

              <label className="block text-sm font-medium text-white/72">
                Cidade
                <input
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  defaultValue={initialValues.city ?? ""}
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45"
                  placeholder="São Paulo"
                />
              </label>

              <label className="block text-sm font-medium text-white/72">
                Estado
                <input
                  name="state"
                  type="text"
                  autoComplete="address-level1"
                  defaultValue={initialValues.state ?? ""}
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45"
                  placeholder="SP"
                />
              </label>

              <label className="block text-sm font-medium text-white/72 sm:col-span-2">
                País
                <input
                  name="country"
                  type="text"
                  autoComplete="country-name"
                  defaultValue={initialValues.country ?? "Brasil"}
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#6D78FF]/45"
                  placeholder="Brasil"
                />
              </label>
            </div>
          </div>
        </div>

        {error ? (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {success}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-6 text-white/52">
            Salve só o mínimo necessário para acelerar a compra. Você ainda poderá revisar tudo antes de pagar.
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            {isPending ? "Salvando..." : "Salvar endereco"}
          </button>
        </div>
      </form>
    </div>
  );
}