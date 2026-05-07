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
    <div className="mt-10 rounded-[1.5rem] border border-stone-950/10 bg-stone-50 px-5 py-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-mono uppercase tracking-[0.28em] text-stone-500">Entrega</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-stone-950">
            Endereco salvo no perfil
          </h2>
        </div>
        <p className="text-sm leading-6 text-stone-600">
          Esses dados agilizam o preenchimento do checkout e do suporte.
        </p>
      </div>

      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-stone-700 sm:col-span-2">
          Telefone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={initialValues.phone ?? ""}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-950/30"
            placeholder="(11) 99999-9999"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700 sm:col-span-2">
          Endereco
          <input
            name="addressLine1"
            type="text"
            autoComplete="address-line1"
            defaultValue={initialValues.addressLine1 ?? ""}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-950/30"
            placeholder="Rua, numero e complemento principal"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700 sm:col-span-2">
          Complemento
          <input
            name="addressLine2"
            type="text"
            autoComplete="address-line2"
            defaultValue={initialValues.addressLine2 ?? ""}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-950/30"
            placeholder="Apartamento, bloco ou referencia"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          Bairro
          <input
            name="neighborhood"
            type="text"
            defaultValue={initialValues.neighborhood ?? ""}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-950/30"
            placeholder="Centro"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          CEP
          <input
            name="postalCode"
            type="text"
            autoComplete="postal-code"
            defaultValue={initialValues.postalCode ?? ""}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-950/30"
            placeholder="00000-000"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          Cidade
          <input
            name="city"
            type="text"
            autoComplete="address-level2"
            defaultValue={initialValues.city ?? ""}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-950/30"
            placeholder="Sao Paulo"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          Estado
          <input
            name="state"
            type="text"
            autoComplete="address-level1"
            defaultValue={initialValues.state ?? ""}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-950/30"
            placeholder="SP"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700 sm:col-span-2">
          Pais
          <input
            name="country"
            type="text"
            autoComplete="country-name"
            defaultValue={initialValues.country ?? "Brasil"}
            className="mt-2 block w-full rounded-2xl border border-stone-950/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-950/30"
            placeholder="Brasil"
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 sm:col-span-2">
            {success}
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-medium text-stone-50 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            {isPending ? "Salvando..." : "Salvar endereco"}
          </button>
        </div>
      </form>
    </div>
  );
}