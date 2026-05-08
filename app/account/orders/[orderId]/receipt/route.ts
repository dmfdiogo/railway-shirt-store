import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { auth, isAuthConfigured } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function isShippingItem(sku: string | null) {
  return sku?.startsWith("shipping:") ?? false;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  if (!isAuthConfigured()) {
    return new Response(null, { status: 404 });
  }

  const session = await auth.api.getSession({ headers: request.headers }).catch(() => null);

  if (!session) {
    return new Response(null, { status: 404 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { emailVerified: true },
  });

  const orderAccessFilter = currentUser?.emailVerified
    ? {
        OR: [
          { userId: session.user.id },
          { userId: null, email: session.user.email },
        ],
      }
    : {
        userId: session.user.id,
      };

  const { orderId } = await params;
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      paymentStatus: "paid",
      ...orderAccessFilter,
    },
    include: {
      items: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!order) {
    return new Response(null, { status: 404 });
  }

  const pdf = await PDFDocument.create();
  const pageSize: [number, number] = [595.28, 841.89];
  let page = pdf.addPage(pageSize);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
  let { height, width } = page.getSize();
  const left = 50;
  let y = height - 56;

  const addPage = () => {
    page = pdf.addPage(pageSize);
    ({ height, width } = page.getSize());
    y = height - 56;
  };

  const drawText = (text: string, options?: { bold?: boolean; size?: number; color?: ReturnType<typeof rgb>; x?: number }) => {
    const size = options?.size ?? 12;
    page.drawText(text, {
      color: options?.color ?? rgb(0.12, 0.12, 0.16),
      font: options?.bold ? boldFont : font,
      size,
      x: options?.x ?? left,
      y,
    });
    y -= size + 8;
  };

  drawText("Be Art — Comprovante de pedido", { bold: true, size: 20 });
  drawText(`Pedido #${order.id.slice(-8).toUpperCase()}`, { bold: true, size: 13 });
  drawText(`Emitido em ${formatDate(new Date())}`, { color: rgb(0.38, 0.38, 0.45), size: 10 });
  y -= 8;
  page.drawLine({
    color: rgb(0.87, 0.88, 0.92),
    end: { x: width - left, y },
    start: { x: left, y },
    thickness: 1,
  });
  y -= 24;

  drawText("Resumo", { bold: true, size: 14 });
  drawText(`Cliente: ${order.email ?? "Não informado"}`);
  drawText(`Pagamento: confirmado em ${formatDate(order.completedAt ?? order.createdAt)}`);
  drawText(`Status logístico: ${order.fulfillmentStatus}`);
  drawText(`Frete: ${order.shippingServiceName ?? order.shippingCarrierName ?? "Serviço padrão"}`);
  if (order.trackingCode) {
    drawText(`Rastreio: ${order.trackingCode}`);
  }
  if (order.trackingUrl) {
    drawText(`Link de rastreio: ${order.trackingUrl}`);
  }
  if (order.shippingDeliveryWindowLabel) {
    drawText(`Prazo estimado: ${order.shippingDeliveryWindowLabel}`);
  }

  y -= 8;
  drawText("Itens", { bold: true, size: 14 });

  const productItems = order.items.filter((item) => !isShippingItem(item.sku));
  for (const item of productItems) {
    if (y < 120) {
      addPage();
    }

    drawText(`${item.name} · Qtd ${item.quantity}`, { bold: true, size: 12 });
    drawText(`Total do item: ${formatCurrency(item.totalAmount, order.currency)}`, {
      color: rgb(0.32, 0.32, 0.38),
      size: 11,
      x: left + 12,
    });
  }

  y -= 6;
  page.drawLine({
    color: rgb(0.87, 0.88, 0.92),
    end: { x: width - left, y },
    start: { x: left, y },
    thickness: 1,
  });
  y -= 24;

  drawText(`Subtotal: ${formatCurrency(order.subtotalAmount, order.currency)}`, { bold: true, size: 12 });
  drawText(`Frete: ${formatCurrency(order.shippingAmount, order.currency)}`, { bold: true, size: 12 });
  drawText(`Total: ${formatCurrency(order.totalAmount, order.currency)}`, { bold: true, size: 14 });

  y -= 16;
  drawText(
    "Este documento é um comprovante comercial do pedido e não substitui documento fiscal emitido por obrigação tributária.",
    { color: rgb(0.38, 0.38, 0.45), size: 10 },
  );

  const pdfBytes = await pdf.save();
  const filename = `beart-pedido-${order.id.slice(-8).toLowerCase()}.pdf`;

  return new Response(pdfBytes, {
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/pdf",
    },
  });
}