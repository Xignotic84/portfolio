"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactNode,
  type RefObject,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

const INSTANT = { duration: 0 };
const HEIGHT_OPEN = { type: "spring", visualDuration: 0.38, bounce: 0 } as const;
const HEIGHT_CLOSE = { type: "spring", visualDuration: 0.26, bounce: 0 } as const;
const FADE_OPEN = { duration: 0.28, delay: 0.06, ease: EASE_OUT };
const FADE_CLOSE = { duration: 0.14, ease: EASE_OUT };

type CollapsibleContextValue = {
  open: boolean;
  toggle: () => void;
  reduce: boolean;
  contentId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(component: string) {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error(`${component} must be used within <Collapsible>`);
  return context;
}

export function Collapsible({ defaultOpen = false, children }: { defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion() ?? false;
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const context = useMemo<CollapsibleContextValue>(
    () => ({
      open,
      toggle: () => setOpen((value) => !value),
      reduce,
      contentId: `${id}-content`,
      triggerRef,
    }),
    [open, reduce, id],
  );

  return (
    <CollapsibleContext.Provider value={context}>
      <div>{children}</div>
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger({ className, children }: { className?: string; children: ReactNode }) {
  const { open, toggle, contentId, triggerRef } = useCollapsibleContext("CollapsibleTrigger");

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={toggle}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl p-2 text-left transition-colors hover:bg-muted",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function CollapsibleContent({ className, children }: { className?: string; children: ReactNode }) {
  const { open, reduce, contentId, triggerRef } = useCollapsibleContext("CollapsibleContent");
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open && contentRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open, triggerRef]);

  return (
    <motion.div
      ref={contentRef}
      id={contentId}
      aria-hidden={!open}
      inert={!open}
      initial={false}
      animate={{ height: open ? "auto" : 0 }}
      transition={reduce ? INSTANT : open ? HEIGHT_OPEN : HEIGHT_CLOSE}
      className="overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -6, filter: "blur(2px)" }}
        transition={reduce ? INSTANT : open ? FADE_OPEN : FADE_CLOSE}
        className={cn("flow-root", className)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function CollapsibleIndicator() {
  const { open, reduce } = useCollapsibleContext("CollapsibleIndicator");

  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      animate={{ rotate: open ? 180 : 0 }}
      transition={reduce ? INSTANT : SPRING_LAYOUT}
      className="mt-1 ml-auto inline-flex shrink-0 text-muted-foreground"
    >
      <ChevronDown className="size-4" />
    </motion.span>
  );
}
