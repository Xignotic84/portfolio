import { OG_SIZE, renderOgCard } from "@/lib/og/card";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.role} in ${site.location.city}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgCard({
    title: site.name,
    subtitle: site.role,
    chips: [`Software Engineer @ ${site.currentEmployer.name}`, `${site.location.city}, ${site.location.country}`],
  });
}
