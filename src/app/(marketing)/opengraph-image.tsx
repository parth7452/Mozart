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
          background: "#ffffff",
          color: "#09090b",
          padding: "72px 80px",
          border: "1px solid #e4e4e7",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "#18181b",
                color: "#fafafa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              M
            </div>
            <div style={{ fontSize: 22, color: "#71717a" }}>
              Invoice factoring · Staffing & suppliers
            </div>
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 56,
              lineHeight: 1.12,
              maxWidth: 880,
              fontWeight: 600,
            }}
          >
            Payroll is Friday. Your client pays in 45 days.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#71717a" }}>
          Mozart · mozart.financial
        </div>
      </div>
    ),
    { ...size },
  );
}
