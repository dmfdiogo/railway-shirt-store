import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2E5BFF 0%, #6B3CF6 100%)",
          color: "#FFFFFF",
          fontSize: 92,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        BA
      </div>
    ),
    size
  );
}
