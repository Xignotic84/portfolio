import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";
import { ImageResponse } from "next/og";
import type { CaseStudyProject } from "@/lib/data/projects";
import { geistFonts } from "@/lib/og/fonts";
import { LogoMark } from "@/lib/og/logo-mark";
import { site } from "@/lib/site";
import { hostname } from "@/lib/utils";

export const OG_SIZE = { width: 1200, height: 630 };

const PAD = 72;

const color = {
  bg: "#131313",
  fg: "#f4f4f4",
  muted: "#a1a1a1",
  subtle: "#6b6b6b",
  border: "rgba(255,255,255,0.08)",
};

async function render(children: ReactNode) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: PAD,
        background: color.bg,
        color: color.fg,
        fontFamily: "Geist",
      }}
    >
      {children}
    </div>,
    { ...OG_SIZE, fonts: await geistFonts() },
  );
}

function Header() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", borderRadius: 11, border: `1px solid ${color.border}` }}>
        <LogoMark size={44} />
      </div>
      <div style={{ fontSize: 24, color: color.muted }}>{hostname(site.url)}</div>
    </div>
  );
}

function Column({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>{children}</div>;
}

export async function renderHomeOgCard() {
  const employer = site.currentEmployer;
  const logo = await publicImage(employer.logo);

  return render(
    <Column>
      <Header />
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1 }}>{site.name}</div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 34, letterSpacing: -0.4, color: color.muted }}>
            {employer.title} at
            <img src={logo} alt="" width={36} height={36} style={{ borderRadius: 9, margin: "0 12px 0 14px" }} />
            <span style={{ color: employer.brandColor }}>{employer.name}</span>
          </div>
        </div>
        <div style={{ fontSize: 26, color: color.subtle, paddingBottom: 4 }}>
          {`${site.location.city}, ${site.location.country}`}
        </div>
      </div>
    </Column>,
  );
}

async function publicImage(src: string) {
  const data = await readFile(join(process.cwd(), "public", src));
  const type = data[0] === 0xff && data[1] === 0xd8 ? "image/jpeg" : "image/png";
  return `data:${type};base64,${data.toString("base64")}`;
}

export async function renderProjectOgCard(project: CaseStudyProject) {
  const image = await publicImage(project.image.src);
  const imageSize = { width: 500, height: OG_SIZE.height - PAD * 2 };

  return render(
    <div style={{ display: "flex", flex: 1, gap: 56 }}>
      <Column>
        <Header />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: -2.2, lineHeight: 1 }}>{project.name}</div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: color.muted }}>{project.description}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 10, fontSize: 22, color: color.subtle }}>
            <span>{project.caseStudy.role}</span>
            <span>{project.caseStudy.period}</span>
          </div>
        </div>
      </Column>

      <div style={{ display: "flex", borderRadius: 24, border: `1px solid ${color.border}`, overflow: "hidden" }}>
        <img src={image} alt="" {...imageSize} style={{ objectFit: "cover" }} />
      </div>
    </div>,
  );
}
