import { ImageResponse } from "next/og";
import { geistFonts } from "@/lib/og/fonts";
import { LogoMark } from "@/lib/og/logo-mark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<LogoMark size={64} />, { ...size, fonts: await geistFonts() });
}
