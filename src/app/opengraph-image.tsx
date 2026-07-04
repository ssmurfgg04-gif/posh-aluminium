import { ImageResponse } from "next/og";
import { COMPANY } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${COMPANY.fullName}. Premium Aluminium & Glass Solutions in Kenya`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0B1F3A 0%, #165DDB 50%, #0B1F3A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: logo lockup */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span
            style={{
              fontSize: 72,
              color: "#D62828",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Posh
          </span>
          <span
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Aluminium
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            We engineer the
            <br />
            aluminium &amp; glass on
            <br />
            Kenya&apos;s skyline.
          </div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
            Curtain walls · Sliding systems · Architectural glazing · Since 2010
          </div>
        </div>

        {/* Bottom: stats row */}
        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 30,
          }}
        >
          {[
            { v: "500+", l: "Projects" },
            { v: "15+", l: "Years" },
            { v: "98%", l: "Satisfied" },
            { v: "24hr", l: "Response" },
          ].map((s) => (
            <div key={s.l} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 900, color: "white" }}>
                {s.v}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                {s.l}
              </span>
            </div>
          ))}
          <div style={{ marginLeft: "auto" }}>
            <span
              style={{
                fontSize: 22,
                color: "white",
                fontWeight: 700,
                background: "#D62828",
                padding: "12px 28px",
                borderRadius: 12,
              }}
            >
              poshaluminium.co.ke
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
