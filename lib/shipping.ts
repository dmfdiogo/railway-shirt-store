export type ShippingRegionCode = "sudeste" | "sul" | "centro-oeste" | "nordeste" | "norte";

export type ShippingOption = {
  amount: number;
  checkoutLabel: string;
  code: ShippingRegionCode;
  deliveryWindowLabel: string;
  description: string;
  displayLabel: string;
  maximumBusinessDays: number;
  minimumBusinessDays: number;
  orderLineLabel: string;
};

export const DEFAULT_SHIPPING_REGION: ShippingRegionCode = "sudeste";

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    amount: 2400,
    checkoutLabel: "Entrega para Sudeste",
    code: "sudeste",
    deliveryWindowLabel: "2 a 4 dias uteis",
    description: "SP, RJ, MG e ES",
    displayLabel: "Sudeste",
    maximumBusinessDays: 4,
    minimumBusinessDays: 2,
    orderLineLabel: "Frete - Sudeste",
  },
  {
    amount: 2600,
    checkoutLabel: "Entrega para Sul",
    code: "sul",
    deliveryWindowLabel: "3 a 5 dias uteis",
    description: "PR, SC e RS",
    displayLabel: "Sul",
    maximumBusinessDays: 5,
    minimumBusinessDays: 3,
    orderLineLabel: "Frete - Sul",
  },
  {
    amount: 2900,
    checkoutLabel: "Entrega para Centro-Oeste",
    code: "centro-oeste",
    deliveryWindowLabel: "4 a 6 dias uteis",
    description: "DF, GO, MT e MS",
    displayLabel: "Centro-Oeste",
    maximumBusinessDays: 6,
    minimumBusinessDays: 4,
    orderLineLabel: "Frete - Centro-Oeste",
  },
  {
    amount: 3400,
    checkoutLabel: "Entrega para Nordeste",
    code: "nordeste",
    deliveryWindowLabel: "5 a 8 dias uteis",
    description: "AL, BA, CE, MA, PB, PE, PI, RN e SE",
    displayLabel: "Nordeste",
    maximumBusinessDays: 8,
    minimumBusinessDays: 5,
    orderLineLabel: "Frete - Nordeste",
  },
  {
    amount: 3900,
    checkoutLabel: "Entrega para Norte",
    code: "norte",
    deliveryWindowLabel: "6 a 10 dias uteis",
    description: "AC, AM, AP, PA, RO, RR e TO",
    displayLabel: "Norte",
    maximumBusinessDays: 10,
    minimumBusinessDays: 6,
    orderLineLabel: "Frete - Norte",
  },
];

export function resolveShippingOption(value?: string | null) {
  return SHIPPING_OPTIONS.find((option) => option.code === value) ?? SHIPPING_OPTIONS[0];
}