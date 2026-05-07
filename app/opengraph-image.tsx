import { ImageResponse } from "next/og";

import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export const alt = `${SITE_NAME} — Moda premium com atmosfera noturna`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "linear-gradient(135deg, #090A0F 0%, #11131B 45%, #171A25 100%)",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "56px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(46,91,255,0.28), transparent 36%), radial-gradient(circle at bottom right, rgba(107,60,246,0.24), transparent 34%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#A5ADFF",
            }}
          >
            Be Art
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 860,
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              textTransform: "uppercase",
            }}
          >
            Camisetas com presença visual e atmosfera noturna.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 720,
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.74)",
            }}
          >
            {SITE_DESCRIPTION}
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999,
              padding: "14px 22px",
              fontSize: 22,
              color: "rgba(255,255,255,0.74)",
            }}
          >
            www.beartstore.com.br
          </div>
        </div>
      </div>
    ),
    size
  );
}