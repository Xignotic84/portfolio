import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import Providers from "@/components/providers";
import ThemeToggle from "../components/ThemeToggle";

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
    <head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-1HPYCRV7ND"></script>
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
