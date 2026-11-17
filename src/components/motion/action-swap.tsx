"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, SPRING_SWAP } from "@/lib/ease";
import { cn } from "@/lib/utils";

const SWAP_BLUR = "blur(2px)";

const ICON_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.25, filter: SWAP_BLUR },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: SPRING_SWAP },
  exit: { opacity: 0, scale: 0.25, filter: SWAP_BLUR, transition: { duration: 0.16, ease: EASE_OUT } },
};

export function ActionSwapIcon({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          aria-hidden
          variants={ICON_VARIANTS}
          initial={reduce ? false : "initial"}
          animate={reduce ? { opacity: 1, filter: "blur(0px)", scale: 1 } : "animate"}
          exit={reduce ? undefined : "exit"}
          className="col-start-1 row-start-1 inline-flex items-center justify-center will-change-[opacity,filter,transform]"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
