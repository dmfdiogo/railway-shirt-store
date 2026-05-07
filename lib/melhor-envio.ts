import type Stripe from "stripe";

import { Prisma, type IntegrationToken } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import type { CheckoutShippingOption } from "@/lib/shipping";

type MelhorEnvioQuoteProduct = {
  height: number;
  id: string;
  insuranceValue: number;
  length: number;
  quantity: number;
  weight: number;
  width: number;
};

type MelhorEnvioApiQuote = {
  company?: {
    id?: number | string;
    name?: string;
  };
  custom_delivery_range?: string;
  custom_delivery_time?: number | string;
  custom_price?: number | string;
  delivery_time?: number | string;
  error?: string;
  id?: number | string;
  name?: string;
  price?: number | string;
};

type MelhorEnvioTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type: string;
};

const MELHOR_ENVIO_PROVIDER = "melhor_envio";
const MELHOR_ENVIO_STATE_COOKIE = "beart-me-oauth-state";
const MELHOR_ENVIO_ACTOR_COOKIE = "beart-me-oauth-actor";
const MELHOR_ENVIO_MIGRATION_REQUIRED_MESSAGE =
  "A tabela da integracao do Melhor Envio ainda nao existe neste banco. Execute a migration antes de autorizar ou consultar fretes reais.";

const DEFAULT_PACKAGE_WIDTH_CM = Number(process.env.MELHOR_ENVIO_DEFAULT_WIDTH_CM ?? 18);
const DEFAULT_PACKAGE_HEIGHT_CM = Number(process.env.MELHOR_ENVIO_DEFAULT_HEIGHT_CM ?? 4);
const DEFAULT_PACKAGE_LENGTH_CM = Number(process.env.MELHOR_ENVIO_DEFAULT_LENGTH_CM ?? 26);
const DEFAULT_PACKAGE_WEIGHT_KG = Number(process.env.MELHOR_ENVIO_DEFAULT_WEIGHT_KG ?? 0.3);

function getMelhorEnvioBaseUrl() {
  return process.env.MELHOR_ENVIO_ENVIRONMENT === "production"
    ? "https://melhorenvio.com.br"
    : "https://sandbox.melhorenvio.com.br";
}

function getMelhorEnvioEnvironment() {
  return process.env.MELHOR_ENVIO_ENVIRONMENT === "production" ? "production" : "sandbox";
}

function getMelhorEnvioUserAgent() {
  return process.env.MELHOR_ENVIO_USER_AGENT ?? "Be Art (contato@beartstore.com.br)";
}

function getMelhorEnvioClientId() {
  return process.env.MELHOR_ENVIO_CLIENT_ID ?? null;
}

function getMelhorEnvioClientSecret() {
  return process.env.MELHOR_ENVIO_CLIENT_SECRET ?? null;
}

function getMelhorEnvioRedirectUri() {
  return (
    process.env.MELHOR_ENVIO_REDIRECT_URI ??
    `${process.env.APP_URL ?? "http://localhost:3000"}/api/integrations/melhor-envio/callback`
  );
}

function getMelhorEnvioScope() {
  return process.env.MELHOR_ENVIO_SCOPE ?? "shipping-calculate shipping-companies ecommerce-shipping";
}

function getConfiguredServiceIds() {
  return (process.env.MELHOR_ENVIO_SERVICE_IDS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .join(",");
}

function getSourcePostalCode() {
  return normalizePostalCode(process.env.MELHOR_ENVIO_FROM_POSTAL_CODE ?? "");
}

function parsePositiveNumber(value: string | undefined, fallbackValue: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackValue;
}

function getMetadataValue(metadata: Record<string, string>, keys: string[]) {
  for (const key of keys) {
    const value = metadata[key]?.trim();
    if (value) return value;
  }

  return undefined;
}

function getPackageNumber(metadata: Record<string, string>, keys: string[], fallbackValue: number) {
  return parsePositiveNumber(getMetadataValue(metadata, keys), fallbackValue);
}

function parseBusinessDays(value: number | string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.max(1, Math.floor(parsed)) : 1;
}

function parsePriceToCents(value: number | string | undefined) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.round(parsed * 100));
}

function buildDeliveryWindowLabel(minimumBusinessDays: number, maximumBusinessDays: number, rawRange?: string) {
  if (rawRange?.trim()) return rawRange.trim();

  if (minimumBusinessDays === maximumBusinessDays) {
    return `${minimumBusinessDays} dia${minimumBusinessDays === 1 ? "" : "s"} uteis`;
  }

  return `${minimumBusinessDays} a ${maximumBusinessDays} dias uteis`;
}

export function normalizePostalCode(value: string) {
  return value.replace(/\D/g, "").slice(0, 8);
}

export function isMelhorEnvioConfigured() {
  return Boolean(
    getSourcePostalCode() &&
      (process.env.MELHOR_ENVIO_ACCESS_TOKEN ||
        (getMelhorEnvioClientId() && getMelhorEnvioClientSecret() && getMelhorEnvioRedirectUri()))
  );
}

export function isMelhorEnvioOAuthConfigured() {
  return Boolean(getMelhorEnvioClientId() && getMelhorEnvioClientSecret() && getMelhorEnvioRedirectUri());
}

export function getMelhorEnvioStateCookieName() {
  return MELHOR_ENVIO_STATE_COOKIE;
}

export function getMelhorEnvioActorCookieName() {
  return MELHOR_ENVIO_ACTOR_COOKIE;
}

export function getMelhorEnvioMigrationRequiredMessage() {
  return MELHOR_ENVIO_MIGRATION_REQUIRED_MESSAGE;
}

export function canManageMelhorEnvio(email?: string | null) {
  const operatorEmails = (process.env.MELHOR_ENVIO_OPERATOR_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (operatorEmails.length === 0) {
    return true;
  }

  return email ? operatorEmails.includes(email.trim().toLowerCase()) : false;
}

export function getMelhorEnvioAuthorizationUrl(state: string) {
  const clientId = getMelhorEnvioClientId();
  const redirectUri = getMelhorEnvioRedirectUri();

  if (!clientId || !redirectUri) {
    throw new Error("Melhor Envio OAuth is not configured.");
  }

  const url = new URL(`${getMelhorEnvioBaseUrl()}/oauth/authorize`);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", state);
  url.searchParams.set("scope", getMelhorEnvioScope());
  return url.toString();
}

function isMissingIntegrationTokenTableError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return error.code === "P2021";
  }

  return error instanceof Error && /IntegrationToken/.test(error.message) && /does not exist/i.test(error.message);
}

async function withIntegrationTokenTable<T>(action: () => Promise<T>) {
  try {
    return await action();
  } catch (error) {
    if (isMissingIntegrationTokenTableError(error)) {
      throw new Error(MELHOR_ENVIO_MIGRATION_REQUIRED_MESSAGE);
    }

    throw error;
  }
}

export async function getMelhorEnvioTokenSnapshot(): Promise<{
  missingTable: boolean;
  token: Pick<IntegrationToken, "expiresAt" | "updatedAt"> | null;
}> {
  try {
    const token = await prisma.integrationToken.findUnique({
      where: {
        provider_environment: {
          environment: getMelhorEnvioEnvironment(),
          provider: MELHOR_ENVIO_PROVIDER,
        },
      },
      select: {
        expiresAt: true,
        updatedAt: true,
      },
    });

    return {
      missingTable: false,
      token,
    };
  } catch (error) {
    if (isMissingIntegrationTokenTableError(error)) {
      return {
        missingTable: true,
        token: null,
      };
    }

    throw error;
  }
}

async function saveMelhorEnvioToken(token: MelhorEnvioTokenResponse) {
  const expiresAt = Number.isFinite(token.expires_in)
    ? new Date(Date.now() + Math.max(0, token.expires_in - 60) * 1000)
    : null;

  return withIntegrationTokenTable(() =>
    prisma.integrationToken.upsert({
      where: {
        provider_environment: {
          environment: getMelhorEnvioEnvironment(),
          provider: MELHOR_ENVIO_PROVIDER,
        },
      },
      update: {
        accessToken: token.access_token,
        expiresAt,
        refreshToken: token.refresh_token,
        scope: token.scope,
        tokenType: token.token_type,
      },
      create: {
        accessToken: token.access_token,
        environment: getMelhorEnvioEnvironment(),
        expiresAt,
        provider: MELHOR_ENVIO_PROVIDER,
        refreshToken: token.refresh_token,
        scope: token.scope,
        tokenType: token.token_type,
      },
    })
  );
}

async function requestMelhorEnvioToken(body: Record<string, string>) {
  const response = await fetch(`${getMelhorEnvioBaseUrl()}/oauth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": getMelhorEnvioUserAgent(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const fallbackMessage = `Falha ao autenticar com o Melhor Envio (${response.status}).`;

    try {
      const payload = (await response.json()) as { message?: string };
      throw new Error(payload.message ?? fallbackMessage);
    } catch {
      throw new Error(fallbackMessage);
    }
  }

  return (await response.json()) as MelhorEnvioTokenResponse;
}

export async function exchangeMelhorEnvioAuthorizationCode(code: string) {
  const clientId = getMelhorEnvioClientId();
  const clientSecret = getMelhorEnvioClientSecret();
  const redirectUri = getMelhorEnvioRedirectUri();

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Melhor Envio OAuth credentials are incomplete.");
  }

  const token = await requestMelhorEnvioToken({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  await saveMelhorEnvioToken(token);
  return token;
}

async function refreshMelhorEnvioAccessToken(refreshToken: string) {
  const clientId = getMelhorEnvioClientId();
  const clientSecret = getMelhorEnvioClientSecret();
  const redirectUri = getMelhorEnvioRedirectUri();

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Melhor Envio refresh credentials are incomplete.");
  }

  const token = await requestMelhorEnvioToken({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
    redirect_uri: redirectUri,
    refresh_token: refreshToken,
  });

  await saveMelhorEnvioToken(token);
  return token.access_token;
}

async function getMelhorEnvioAccessToken() {
  const envToken = process.env.MELHOR_ENVIO_ACCESS_TOKEN;
  if (envToken) return envToken;

  const savedToken = await withIntegrationTokenTable(() =>
    prisma.integrationToken.findUnique({
      where: {
        provider_environment: {
          environment: getMelhorEnvioEnvironment(),
          provider: MELHOR_ENVIO_PROVIDER,
        },
      },
    })
  );

  if (!savedToken) {
    throw new Error("Melhor Envio ainda nao foi conectado via OAuth.");
  }

  const expiresAt = savedToken.expiresAt?.getTime() ?? null;
  if (!expiresAt || expiresAt > Date.now()) {
    return savedToken.accessToken;
  }

  if (!savedToken.refreshToken) {
    throw new Error("Melhor Envio exige uma nova autorizacao porque o token expirou.");
  }

  return refreshMelhorEnvioAccessToken(savedToken.refreshToken);
}

export function buildMelhorEnvioProductFromStripePrice(
  price: Stripe.Price,
  quantity: number
): MelhorEnvioQuoteProduct {
  if (price.unit_amount === null) {
    throw new Error("Stripe price must define unit_amount before quoting shipping.");
  }

  const rawProduct = typeof price.product === "string" || price.product.deleted ? null : price.product;
  const mergedMetadata = {
    ...(rawProduct?.metadata ?? {}),
    ...(price.metadata ?? {}),
  } as Record<string, string>;

  return {
    height: getPackageNumber(
      mergedMetadata,
      ["package_height_cm", "shipping_height_cm", "height_cm", "height"],
      DEFAULT_PACKAGE_HEIGHT_CM
    ),
    id: price.id,
    insuranceValue: price.unit_amount / 100,
    length: getPackageNumber(
      mergedMetadata,
      ["package_length_cm", "shipping_length_cm", "length_cm", "length"],
      DEFAULT_PACKAGE_LENGTH_CM
    ),
    quantity: Math.max(1, Math.floor(quantity)),
    weight: getPackageNumber(
      mergedMetadata,
      ["weight_kg", "shipping_weight_kg", "package_weight_kg", "weight"],
      DEFAULT_PACKAGE_WEIGHT_KG
    ),
    width: getPackageNumber(
      mergedMetadata,
      ["package_width_cm", "shipping_width_cm", "width_cm", "width"],
      DEFAULT_PACKAGE_WIDTH_CM
    ),
  };
}

export async function calculateMelhorEnvioShippingQuotes({
  products,
  toPostalCode,
}: {
  products: MelhorEnvioQuoteProduct[];
  toPostalCode: string;
}): Promise<CheckoutShippingOption[]> {
  const accessToken = await getMelhorEnvioAccessToken();
  const fromPostalCode = getSourcePostalCode();
  const destinationPostalCode = normalizePostalCode(toPostalCode);

  if (!accessToken || !fromPostalCode) {
    throw new Error("Melhor Envio is not configured.");
  }

  if (destinationPostalCode.length !== 8) {
    throw new Error("CEP de destino invalido para cotacao.");
  }

  const response = await fetch(`${getMelhorEnvioBaseUrl()}/api/v2/me/shipment/calculate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": getMelhorEnvioUserAgent(),
    },
    body: JSON.stringify({
      from: {
        postal_code: fromPostalCode,
      },
      options: {
        own_hand: false,
        receipt: false,
      },
      products: products.map((product) => ({
        height: product.height,
        id: product.id,
        insurance_value: product.insuranceValue,
        length: product.length,
        quantity: product.quantity,
        weight: product.weight,
        width: product.width,
      })),
      services: getConfiguredServiceIds() || undefined,
      to: {
        postal_code: destinationPostalCode,
      },
    }),
  });

  if (!response.ok) {
    const fallbackMessage = `Falha ao consultar o Melhor Envio (${response.status}).`;

    try {
      const payload = (await response.json()) as { message?: string };
      throw new Error(payload.message ?? fallbackMessage);
    } catch {
      throw new Error(fallbackMessage);
    }
  }

  const payload = (await response.json()) as MelhorEnvioApiQuote[];

  return payload
    .filter((quote) => !quote.error)
    .map((quote) => {
      const carrierName = quote.company?.name?.trim() || "Transportadora";
      const serviceName = quote.name?.trim() || "Servico";
      const serviceCode = String(quote.id ?? serviceName).trim();
      const maximumBusinessDays = parseBusinessDays(quote.custom_delivery_time ?? quote.delivery_time);
      const minimumBusinessDays = Math.max(1, maximumBusinessDays - 1);
      const amount = parsePriceToCents(quote.custom_price ?? quote.price);

      return {
        amount,
        carrierName,
        checkoutLabel: `${carrierName} · ${serviceName}`,
        code: serviceCode,
        deliveryWindowLabel: buildDeliveryWindowLabel(
          minimumBusinessDays,
          maximumBusinessDays,
          quote.custom_delivery_range
        ),
        description: "Cotacao em tempo real via Melhor Envio.",
        displayLabel: `${carrierName} · ${serviceName}`,
        maximumBusinessDays,
        minimumBusinessDays,
        orderLineLabel: `Frete - ${carrierName} · ${serviceName}`,
        postalCode: destinationPostalCode,
        serviceName,
        source: "melhor_envio" as const,
      } satisfies CheckoutShippingOption;
    })
    .filter((quote) => quote.amount >= 0);
}