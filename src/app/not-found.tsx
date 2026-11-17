import type { Metadata } from "next";
import { ButtonLink } from "@/components/motion/button";
import { AnimatedNumber } from "@/components/ui/animated-number";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <AnimatedNumber value={404} className="text-7xl font-semibold tracking-tight sm:text-8xl" />
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground">This page doesn&apos;t exist or has moved.</p>
      </div>
      <ButtonLink href="/">Back home</ButtonLink>
    </div>
  );
}
