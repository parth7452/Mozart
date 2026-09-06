import { ImageResponse } from "next/og";

export const alt = "Mozart — invoice factoring for staffing firms and suppliers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3EEE4",
          color: "#141210",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#9A7348",
            }}
          >
            Early access · Research stage · Not live funding
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 58,
              lineHeight: 1.12,
              maxWidth: 880,
            }}
          >
            Get cash from invoices you've already earned, while your customer is still paying.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#1A3C32" }}>
          Mozart · Invoice factoring · mozart.financial
        </div>
      </div>
    ),
    { ...size },
  );
}
