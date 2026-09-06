import { ImageResponse } from "next/og";

export const alt = "Mozart — AI-native invoice factoring";
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
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#9A7348",
            }}
          >
            Mozart · mozart.financial
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 68,
              lineHeight: 1.1,
              maxWidth: 960,
            }}
          >
            AI-native invoice factoring for staffing firms and SMB suppliers.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#1A3C32" }}>
          Research stage · Not live funding · US receivables
        </div>
      </div>
    ),
    { ...size },
  );
}
