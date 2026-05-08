type StatusMeta = {
  badgeClassName: string;
  description: string;
  label: string;
};

export type OrderTimelineItem = {
  date: Date | null;
  description: string;
  key: string;
  label: string;
  state: "done" | "current" | "pending";
};

export function getPaymentStatusMeta(status: string): StatusMeta {
  switch (status) {
    case "paid":
      return {
        badgeClassName: "border-emerald-400/20 bg-emerald-500/12 text-emerald-100",
        description: "Pagamento confirmado e registrado pela Be Art.",
        label: "Pago",
      };
    case "canceled":
      return {
        badgeClassName: "border-red-400/20 bg-red-500/12 text-red-100",
        description: "Checkout encerrado antes da confirmação do pagamento.",
        label: "Cancelado",
      };
    case "refunded":
      return {
        badgeClassName: "border-amber-400/20 bg-amber-500/12 text-amber-100",
        description: "Pagamento estornado para o método original.",
        label: "Reembolsado",
      };
    case "checkout_open":
      return {
        badgeClassName: "border-sky-400/20 bg-sky-500/12 text-sky-100",
        description: "Checkout aberto e aguardando finalização do pagamento.",
        label: "Checkout aberto",
      };
    default:
      return {
        badgeClassName: "border-white/10 bg-white/[0.04] text-white/72",
        description: "Pedido criado e aguardando andamento do pagamento.",
        label: "Pendente",
      };
  }
}

export function getFulfillmentStatusMeta(status: string): StatusMeta {
  switch (status) {
    case "processing":
      return {
        badgeClassName: "border-violet-400/20 bg-violet-500/12 text-violet-100",
        description: "Pagamento confirmado. O pedido está em preparação para envio.",
        label: "Em preparação",
      };
    case "shipped":
      return {
        badgeClassName: "border-sky-400/20 bg-sky-500/12 text-sky-100",
        description: "Pedido postado e em rota para o endereço de entrega.",
        label: "Enviado",
      };
    case "delivered":
      return {
        badgeClassName: "border-emerald-400/20 bg-emerald-500/12 text-emerald-100",
        description: "Entrega concluída com sucesso.",
        label: "Entregue",
      };
    case "returned":
      return {
        badgeClassName: "border-amber-400/20 bg-amber-500/12 text-amber-100",
        description: "O envio retornou após a postagem e exige análise operacional.",
        label: "Devolvido",
      };
    case "canceled":
      return {
        badgeClassName: "border-red-400/20 bg-red-500/12 text-red-100",
        description: "Fluxo logístico cancelado antes da postagem.",
        label: "Cancelado",
      };
    default:
      return {
        badgeClassName: "border-white/10 bg-white/[0.04] text-white/72",
        description: "Aguardando liberação para o fluxo operacional.",
        label: "Pendente",
      };
  }
}

export function getPrimaryOrderStatusMeta({
  fulfillmentStatus,
  paymentStatus,
}: {
  fulfillmentStatus: string;
  paymentStatus: string;
}) {
  if (paymentStatus !== "paid") {
    return getPaymentStatusMeta(paymentStatus);
  }

  return getFulfillmentStatusMeta(fulfillmentStatus);
}

export function getOrderReferenceDate(order: {
  canceledAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  deliveredAt: Date | null;
  processingAt: Date | null;
  shippedAt: Date | null;
}) {
  return (
    order.deliveredAt ??
    order.shippedAt ??
    order.processingAt ??
    order.completedAt ??
    order.canceledAt ??
    order.createdAt
  );
}

export function getOrderTimeline(order: {
  completedAt: Date | null;
  createdAt: Date;
  deliveredAt: Date | null;
  fulfillmentStatus: string;
  paymentStatus: string;
  processingAt: Date | null;
  shippedAt: Date | null;
}) {
  const paymentConfirmedDate =
    order.completedAt ??
    order.processingAt ??
    order.shippedAt ??
    order.deliveredAt ??
    null;

  const paymentState: OrderTimelineItem["state"] =
    order.paymentStatus === "paid"
      ? "done"
      : order.paymentStatus === "checkout_open" || order.paymentStatus === "pending"
        ? "current"
        : "pending";

  const preparationReached = ["processing", "shipped", "delivered", "returned"].includes(order.fulfillmentStatus);
  const shippedReached = ["shipped", "delivered", "returned"].includes(order.fulfillmentStatus);
  const deliveredReached = order.fulfillmentStatus === "delivered";

  return [
    {
      date: order.createdAt,
      description: "Pedido recebido pela Be Art.",
      key: "created",
      label: "Pedido criado",
      state: "done",
    },
    {
      date: paymentState === "done" ? paymentConfirmedDate : null,
      description:
        paymentState === "done"
          ? "Pagamento aprovado e liberado para operação."
          : "Aguardando confirmação do pagamento.",
      key: "paid",
      label: "Pagamento",
      state: paymentState,
    },
    {
      date: preparationReached ? (order.processingAt ?? paymentConfirmedDate) : null,
      description:
        preparationReached
          ? "Separação e conferência em andamento ou concluídas."
          : "Entrará em preparação assim que o pedido for liberado.",
      key: "processing",
      label: "Preparação",
      state:
        preparationReached
          ? "done"
          : paymentState === "done"
            ? "current"
            : "pending",
    },
    {
      date: shippedReached ? order.shippedAt : null,
      description:
        shippedReached
          ? "Pedido postado e seguindo para entrega."
          : "Será marcado quando o pacote for postado.",
      key: "shipped",
      label: "Envio",
      state:
        shippedReached
          ? "done"
          : preparationReached
            ? "current"
            : "pending",
    },
    {
      date: deliveredReached ? order.deliveredAt : null,
      description:
        deliveredReached
          ? "Entrega finalizada no destino."
          : "Aguardando confirmação final da entrega.",
      key: "delivered",
      label: "Entrega",
      state:
        deliveredReached
          ? "done"
          : shippedReached
            ? "current"
            : "pending",
    },
  ] satisfies OrderTimelineItem[];
}