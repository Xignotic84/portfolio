import { ImageResponse } from "next/og";
import { geistFonts } from "@/lib/og/fonts";
import { LogoMark } from "@/lib/og/logo-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<LogoMark size={180} rounded={false} />, { ...size, fonts: await geistFonts() });
}
