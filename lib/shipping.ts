export type ShippingRegionCode = "sudeste" | "sul" | "centro-oeste" | "nordeste" | "norte";

export type ShippingSource = "fixed_table" | "melhor_envio";

export type CheckoutShippingOption = {
  amount: number;
  checkoutLabel: string;
  code: string;
  carrierName: string | null;
  deliveryWindowLabel: string;
  description: string;
  displayLabel: string;
  maximumBusinessDays: number;
  minimumBusinessDays: number;
  orderLineLabel: string;
  postalCode: string | null;
  serviceName: string | null;
  source: ShippingSource;
};

export type ShippingOption = CheckoutShippingOption & {
  code: ShippingRegionCode;
  source: "fixed_table";
};

export const DEFAULT_SHIPPING_REGION: ShippingRegionCode = "sudeste";

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    amount: 2400,
    carrierName: null,
    checkoutLabel: "Entrega para Sudeste",
    code: "sudeste",
    deliveryWindowLabel: "2 a 4 dias uteis",
    description: "SP, RJ, MG e ES",
    displayLabel: "Sudeste",
    maximumBusinessDays: 4,
    minimumBusinessDays: 2,
    orderLineLabel: "Frete - Sudeste",
    postalCode: null,
    serviceName: null,
    source: "fixed_table",
  },
  {
    amount: 2600,
    carrierName: null,
    checkoutLabel: "Entrega para Sul",
    code: "sul",
    deliveryWindowLabel: "3 a 5 dias uteis",
    description: "PR, SC e RS",
    displayLabel: "Sul",
    maximumBusinessDays: 5,
    minimumBusinessDays: 3,
    orderLineLabel: "Frete - Sul",
    postalCode: null,
    serviceName: null,
    source: "fixed_table",
  },
  {
    amount: 2900,
    carrierName: null,
    checkoutLabel: "Entrega para Centro-Oeste",
    code: "centro-oeste",
    deliveryWindowLabel: "4 a 6 dias uteis",
    description: "DF, GO, MT e MS",
    displayLabel: "Centro-Oeste",
    maximumBusinessDays: 6,
    minimumBusinessDays: 4,
    orderLineLabel: "Frete - Centro-Oeste",
    postalCode: null,
    serviceName: null,
    source: "fixed_table",
  },
  {
    amount: 3400,
    carrierName: null,
    checkoutLabel: "Entrega para Nordeste",
    code: "nordeste",
    deliveryWindowLabel: "5 a 8 dias uteis",
    description: "AL, BA, CE, MA, PB, PE, PI, RN e SE",
    displayLabel: "Nordeste",
    maximumBusinessDays: 8,
    minimumBusinessDays: 5,
    orderLineLabel: "Frete - Nordeste",
    postalCode: null,
    serviceName: null,
    source: "fixed_table",
  },
  {
    amount: 3900,
    carrierName: null,
    checkoutLabel: "Entrega para Norte",
    code: "norte",
    deliveryWindowLabel: "6 a 10 dias uteis",
    description: "AC, AM, AP, PA, RO, RR e TO",
    displayLabel: "Norte",
    maximumBusinessDays: 10,
    minimumBusinessDays: 6,
    orderLineLabel: "Frete - Norte",
    postalCode: null,
    serviceName: null,
    source: "fixed_table",
  },
];

export function resolveShippingOption(value?: string | null) {
  return SHIPPING_OPTIONS.find((option) => option.code === value) ?? SHIPPING_OPTIONS[0];
}

export function serializeCheckoutShippingOption(option: CheckoutShippingOption | null | undefined) {
  return option ? JSON.stringify(option) : "";
}

export function parseCheckoutShippingOption(value?: string | null): CheckoutShippingOption | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<CheckoutShippingOption>;
    if (
      typeof parsed.amount !== "number" ||
      !Number.isFinite(parsed.amount) ||
      typeof parsed.checkoutLabel !== "string" ||
      typeof parsed.code !== "string" ||
      typeof parsed.deliveryWindowLabel !== "string" ||
      typeof parsed.description !== "string" ||
      typeof parsed.displayLabel !== "string" ||
      typeof parsed.maximumBusinessDays !== "number" ||
      typeof parsed.minimumBusinessDays !== "number" ||
      typeof parsed.orderLineLabel !== "string" ||
      (parsed.source !== "fixed_table" && parsed.source !== "melhor_envio")
    ) {
      return null;
    }

    return {
      amount: Math.max(0, Math.floor(parsed.amount)),
      carrierName: typeof parsed.carrierName === "string" ? parsed.carrierName : null,
      checkoutLabel: parsed.checkoutLabel,
      code: parsed.code,
      deliveryWindowLabel: parsed.deliveryWindowLabel,
      description: parsed.description,
      displayLabel: parsed.displayLabel,
      maximumBusinessDays: Math.max(0, Math.floor(parsed.maximumBusinessDays)),
      minimumBusinessDays: Math.max(0, Math.floor(parsed.minimumBusinessDays)),
      orderLineLabel: parsed.orderLineLabel,
      postalCode: typeof parsed.postalCode === "string" ? parsed.postalCode : null,
      serviceName: typeof parsed.serviceName === "string" ? parsed.serviceName : null,
      source: parsed.source,
    };
  } catch {
    return null;
  }
}

export function buildShippingSku(option: CheckoutShippingOption) {
  return `shipping:${option.source}:${option.code}`;
}