import { ImageResponse } from "next/og";
import { geistFonts } from "@/lib/og/fonts";
import { LogoMark } from "@/lib/og/logo-mark";
import { site } from "@/lib/site";
import { hostname } from "@/lib/utils";

export const OG_SIZE = { width: 1200, height: 630 };

const CHIP = { display: "flex", padding: "10px 20px", borderRadius: 999, border: "1px solid #333" } as const;
const ACCENT_CHIP = { ...CHIP, border: "1px solid rgba(59,155,255,0.5)", color: "#3b9bff" } as const;

export async function renderOgCard({ title, subtitle, chips }: { title: string; subtitle: string; chips: string[] }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#131313",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
        color: "#f4f4f4",
        fontFamily: "Geist",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", borderRadius: 14, border: "1px solid #333" }}>
          <LogoMark size={64} />
        </div>
        <div style={{ fontSize: 30, color: "#a3a3a3" }}>{hostname(site.url)}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -3 }}>{title}</div>
        <div style={{ fontSize: 32, lineHeight: 1.35, color: "#d4d4d4", maxWidth: 1000 }}>{subtitle}</div>
      </div>

      <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#a3a3a3" }}>
        {chips.map((chip, index) => (
          <div key={chip} style={index === 0 ? ACCENT_CHIP : CHIP}>
            {chip}
          </div>
        ))}
      </div>
    </div>,
    { ...OG_SIZE, fonts: await geistFonts() },
  );
}
