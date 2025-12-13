import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import Providers from "@/components/providers";
import ThemeToggle from "../components/ThemeToggle";
import {GoogleAnalytics} from '@next/third-parties/google'
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xignotic",
  description: "Xignotic is a Full Stack Engineer based in Amsterdam, Netherlands. Find out more here.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <Script async src="https://analytics.xignotic.dev/js/pa-QOkTuDzFHNNbUE6xPCD02.js"></Script>
    <Script
      id="next-plausible-init"
      dangerouslySetInnerHTML={{
        __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
      }}
    />
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <GoogleAnalytics gaId="G-1HPYCRV7ND"/>
    <Providers>

      <div className='p-5 lg:p-0 mx-auto max-w-[1280px]'>
        <div className={'mt-8 mb-8'}>{children}</div>
      </div>
      <ThemeToggle/>
    </Providers>
    </body>
    </html>
  );
}
