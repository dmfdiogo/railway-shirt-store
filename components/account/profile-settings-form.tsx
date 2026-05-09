"use client";

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

function hasSavedDeliveryProfile(initialValues: ProfileSettingsFormProps["initialValues"]) {
  return Boolean(initialValues.addressLine1 && initialValues.postalCode && initialValues.city && initialValues.state);
}

function getProfileLocation(initialValues: ProfileSettingsFormProps["initialValues"]) {
  return [initialValues.city, initialValues.state].filter(Boolean).join(" · ");
}

function normalizeOptionalField(value: FormDataEntryValue | null) {
  const normalized = String(value ?? "").trim();
  return normalized.length > 0 ? normalized : null;
}

export function ProfileSettingsForm({ initialValues }: ProfileSettingsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const profileReady = hasSavedDeliveryProfile(initialValues);
  const profileLocation = getProfileLocation(initialValues);
  const hasPhone = Boolean(initialValues.phone);

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
    <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-mono uppercase tracking-[0.28em] text-[#A5ADFF]">Entrega</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            Perfil de entrega
          </h2>
        </div>
        <p className="text-sm leading-6 text-white/58">
          Esses dados reduzem atrito no checkout e deixam suporte e rastreio mais objetivos.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/72">
          {profileReady ? "Perfil pronto para checkout" : "Complete o endereço principal"}
        </div>
        <div className="inline-flex items-center rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/72">
          {hasPhone ? "Telefone salvo" : "Telefone pendente"}
        </div>
        {profileLocation ? (
          <div className="inline-flex items-center rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/72">
            {profileLocation}
          </div>
        ) : null}
      </div>

      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div className="lg:pt-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Contato</p>
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
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Endereço</p>
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
          <div className="mt-6 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
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
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2E5BFF_0%,#6B3CF6_100%)] px-6 text-sm font-medium text-white shadow-[0_16px_38px_rgba(61,79,255,0.34)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Salvando..." : "Salvar endereco"}
          </button>
        </div>
      </form>
    </div>
  );
}