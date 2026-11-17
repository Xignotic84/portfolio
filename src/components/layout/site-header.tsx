import { ThemeToggle } from "@/components/motion/theme-toggle";

export function SiteHeader() {
  return (
    <header className="relative mx-auto max-w-5xl">
      <ThemeToggle className="absolute top-4 right-4 z-10" />
    </header>
  );
}
