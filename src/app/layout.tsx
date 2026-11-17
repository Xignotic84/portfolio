import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import { Analytics } from "@/components/layout/analytics";
import { Providers } from "@/components/layout/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata({ description: site.description, path: "/", type: "profile" }),
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [...site.keywords],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#131313" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <SiteHeader />
          <main className="mx-auto max-w-5xl px-4">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
