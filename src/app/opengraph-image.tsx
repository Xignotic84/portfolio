import { OG_SIZE, renderHomeOgCard } from "@/lib/og/card";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.role} in ${site.location.city}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderHomeOgCard();
}
