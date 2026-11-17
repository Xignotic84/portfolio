"use client";

import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { ActionSwapIcon } from "@/components/motion/action-swap";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    if (reduce || !document.startViewTransition) setTheme(next);
    else document.startViewTransition(() => setTheme(next));
  };

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={cn(
        "grid size-9 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      {mounted ? (
        <ActionSwapIcon value={isDark ? "dark" : "light"} className="size-4">
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </ActionSwapIcon>
      ) : (
        <span aria-hidden="true" className="inline-grid size-4 place-items-center">
          <Sun className="hidden size-4 dark:block" />
          <Moon className="size-4 dark:hidden" />
        </span>
      )}
    </button>
  );
}
