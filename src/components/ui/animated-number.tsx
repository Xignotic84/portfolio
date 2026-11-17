"use client";

import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const LOCALE = "en-US";

export function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const formatted = value.toLocaleString(LOCALE);

  return (
    <span ref={ref} className={cn("inline-grid justify-items-end tabular-nums", className)}>
      <span className="sr-only">{formatted}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {formatted}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        <NumberFlow value={inView ? value : 0} locales={LOCALE} />
      </span>
    </span>
  );
}
