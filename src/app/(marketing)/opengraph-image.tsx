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
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "#1A3C32",
                color: "#F3EEE4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              M
            </div>
            <div
              style={{
                marginLeft: 14,
                fontSize: 20,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1A3C32",
              }}
            >
              Invoice factoring · Staffing & suppliers
            </div>
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 56,
              lineHeight: 1.12,
              maxWidth: 880,
            }}
          >
            Payroll is Friday. Your client pays in 45 days.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#1A3C32" }}>
          Mozart · mozart.financial
        </div>
      </div>
    ),
    { ...size },
  );
}
