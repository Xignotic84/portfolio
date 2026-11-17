"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { NEW_TAB, NewTabHint } from "@/components/ui/external-link";
import { SPRING_PRESS } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

const VARIANTS = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
};

const SIZES = {
  sm: "h-8 gap-1.5 px-3",
  md: "h-10 gap-2 px-5",
};

type ButtonLinkProps = Omit<ComponentProps<typeof MotionLink>, "children"> & {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  external?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();

  return (
    <MotionLink
      {...(external ? NEW_TAB : {})}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      whileHover={reduce || !canHover ? undefined : { scale: 1.02 }}
      transition={SPRING_PRESS}
      className={cn(
        "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors select-none",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
      {external ? <NewTabHint /> : null}
    </MotionLink>
  );
}
