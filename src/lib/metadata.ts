import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
  type,
}: {
  title?: string;
  description: string;
  path: string;
  type: "website" | "profile" | "article";
}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : site.title;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type, url: path, siteName: site.name, locale: site.locale, title: fullTitle, description },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
