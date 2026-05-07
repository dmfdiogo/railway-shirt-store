import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.APP_URL ?? "http://localhost:3000";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Be Art — Camisetas de Rave",
  description:
    "Camisetas de rave com presença, sofisticação e atmosfera noturna. Moda premium para quem quer vestir poder e mistério.",
  openGraph: {
    title: "Be Art — Camisetas de Rave",
    description:
      "Camisetas de rave com presença, sofisticação e atmosfera noturna. Moda premium para quem quer vestir poder e mistério.",
    url: "/",
    siteName: "Be Art",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Be Art — Camisetas de Rave",
    description:
      "Camisetas de rave com presença, sofisticação e atmosfera noturna. Moda premium para quem quer vestir poder e mistério.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0C] text-white">
        {children}
      </body>
    </html>
  );
}
