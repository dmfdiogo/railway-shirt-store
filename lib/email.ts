import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

type OrderItemRow = {
  name: string;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
};

type OrderConfirmationEmailArgs = {
  to: string;
  orderId: string;
  items: OrderItemRow[];
  totalAmount: number;
  currency: string;
};

function formatCurrency(amountInCents: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  items,
  totalAmount,
  currency,
}: OrderConfirmationEmailArgs): Promise<void> {
  if (!resend) return;

  const itemRows = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">${item.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right;">${formatCurrency(item.unitAmount, currency)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right;">${formatCurrency(item.totalAmount, currency)}</td>
        </tr>`,
    )
    .join("");

  const shortId = orderId.slice(-8).toUpperCase();

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <h2 style="margin-bottom:4px;color:#111;">Pedido confirmado!</h2>
      <p style="margin-top:0;color:#555;">Obrigado pela sua compra. Seu pedido foi recebido e confirmado.</p>
      <p style="color:#888;font-size:13px;">Nº do pedido: <strong style="color:#333;">#${shortId}</strong></p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px;">
        <thead>
          <tr style="background:#f8f8f8;">
            <th style="padding:10px 12px;text-align:left;color:#666;font-weight:600;">Produto</th>
            <th style="padding:10px 12px;text-align:center;color:#666;font-weight:600;">Qtd</th>
            <th style="padding:10px 12px;text-align:right;color:#666;font-weight:600;">Preço unit.</th>
            <th style="padding:10px 12px;text-align:right;color:#666;font-weight:600;">Total</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding:12px;text-align:right;font-weight:700;font-size:15px;">Total</td>
            <td style="padding:12px;text-align:right;font-weight:700;font-size:15px;">${formatCurrency(totalAmount, currency)}</td>
          </tr>
        </tfoot>
      </table>
      <p>
        <a href="${APP_URL}/account"
           style="display:inline-block;padding:10px 22px;background:#111;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">
          Ver meus pedidos
        </a>
      </p>
      <hr style="border:none;border-top:1px solid #f0f0f0;margin:32px 0;">
      <p style="font-size:12px;color:#aaa;margin:0;">Beart Store &middot; beartstore.com.br</p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Pedido #${shortId} confirmado — Beart Store`,
    html,
  });
}

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}): Promise<void> {
  if (!resend) return;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <h2 style="margin-bottom:4px;color:#111;">Bem-vindo à Beart Store! 👋</h2>
      <p style="color:#555;">Olá, <strong>${name}</strong>! É um prazer ter você por aqui.</p>
      <p style="color:#555;">Explore nosso catálogo e encontre a camiseta perfeita para você.</p>
      <p style="margin-top:32px;">
        <a href="${APP_URL}/shop"
           style="display:inline-block;padding:12px 28px;background:#111;color:#fff;text-decoration:none;border-radius:999px;font-size:15px;font-weight:600;">
          Ver catálogo
        </a>
      </p>
      <hr style="border:none;border-top:1px solid #f0f0f0;margin:32px 0;">
      <p style="font-size:12px;color:#aaa;margin:0;">Beart Store &middot; beartstore.com.br</p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Bem-vindo à Beart Store!",
    html,
  });
}
