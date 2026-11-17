"use client";

import { animate, type MotionValue, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { type PopoverLayout, usePopoverLayout } from "@/components/motion/popover-layout";
import { useDismiss } from "@/lib/hooks/use-dismiss";
import { useHoverGesture } from "@/lib/hooks/use-hover-gesture";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";

type Align = "start" | "end";
type Rect = { x: number; y: number; w: number; h: number; r: number };
type Geo = { left: number; layerW: number; layerH: number; trigger: Rect; panel: Rect };

const SIDE_OFFSET = 14;
const PANEL_RADIUS = 16;
const GOO_STRENGTH = 8;
const HOVER_CLOSE_DELAY = 120;
const CIRCLE_KAPPA = 0.5523;
const GOO_OPEN_SPRING = { type: "spring", visualDuration: 0.3, bounce: 0.15 } as const;
const GOO_CLOSE_SPRING = { type: "spring", visualDuration: 0.21, bounce: 0.15 } as const;
const EMPTY_LAYOUT: PopoverLayout = { left: 0, top: 0, width: 0, height: 0, radius: 0, contentWidth: 0, contentHeight: 0 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function buildGeo(layout: PopoverLayout | null, align: Align): Geo {
  const { width, height, radius, contentWidth, contentHeight } = layout ?? EMPTY_LAYOUT;
  const panelX = align === "start" ? 0 : width - contentWidth;
  const panelY = height + SIDE_OFFSET;
  const left = Math.min(0, panelX);

  return {
    left,
    layerW: Math.max(width, panelX + contentWidth) - left,
    layerH: panelY + contentHeight,
    trigger: { x: -left, y: 0, w: width, h: height, r: Math.min(height / 2, radius) },
    panel: { x: panelX - left, y: panelY, w: contentWidth, h: contentHeight, r: PANEL_RADIUS },
  };
}

function rectAt({ trigger, panel }: Geo, progress: number): Rect {
  return {
    x: lerp(trigger.x, panel.x, progress),
    y: lerp(trigger.y, panel.y, progress),
    w: lerp(trigger.w, panel.w, progress),
    h: lerp(trigger.h, panel.h, progress),
    r: lerp(trigger.r, panel.r, progress),
  };
}

const rectStyle = (rect: Rect) => ({ left: rect.x, top: rect.y, width: rect.w, height: rect.h, borderRadius: rect.r });

function insetClip(rect: Rect, geo: Geo) {
  const right = geo.layerW - (rect.x + rect.w);
  const bottom = geo.layerH - (rect.y + rect.h);
  return `inset(${rect.y}px ${right}px ${bottom}px ${rect.x}px round ${rect.r}px)`;
}

function shapeClip(rect: Rect) {
  const radius = Math.max(0, Math.min(rect.r, rect.w / 2, rect.h / 2));
  const control = radius * CIRCLE_KAPPA;
  const x1 = rect.x;
  const y1 = rect.y;
  const x2 = rect.x + rect.w;
  const y2 = rect.y + rect.h;
  const px = (value: number) => `${value.toFixed(3)}px`;

  return (
    `shape(from ${px(x1 + radius)} ${px(y1)}, ` +
    `line to ${px(x2 - radius)} ${px(y1)}, ` +
    `curve to ${px(x2)} ${px(y1 + radius)} with ${px(x2 - radius + control)} ${px(y1)} / ${px(x2)} ${px(y1 + radius - control)}, ` +
    `line to ${px(x2)} ${px(y2 - radius)}, ` +
    `curve to ${px(x2 - radius)} ${px(y2)} with ${px(x2)} ${px(y2 - radius + control)} / ${px(x2 - radius + control)} ${px(y2)}, ` +
    `line to ${px(x1 + radius)} ${px(y2)}, ` +
    `curve to ${px(x1)} ${px(y2 - radius)} with ${px(x1 + radius - control)} ${px(y2)} / ${px(x1)} ${px(y2 - radius + control)}, ` +
    `line to ${px(x1)} ${px(y1 + radius)}, ` +
    `curve to ${px(x1 + radius)} ${px(y1)} with ${px(x1)} ${px(y1 + radius - control)} / ${px(x1 + radius - control)} ${px(y1)}, ` +
    "close)"
  );
}

let shapeSupported: boolean | undefined;
const supportsShape = () =>
  (shapeSupported ??= CSS.supports("clip-path", "shape(from 0px 0px, line to 1px 1px, close)"));

function clipAt(geo: Geo, progress: number) {
  const rect = rectAt(geo, progress);
  return supportsShape() ? shapeClip(rect) : insetClip(rect, geo);
}

function roundedRectPath(rect: Rect) {
  const radius = Math.max(0, Math.min(rect.r, rect.w / 2, rect.h / 2));
  const n = (value: number) => value.toFixed(3);
  const x1 = rect.x;
  const y1 = rect.y;
  const x2 = rect.x + rect.w;
  const y2 = rect.y + rect.h;
  const arc = `A${n(radius)} ${n(radius)} 0 0 1`;

  return (
    `M${n(x1 + radius)} ${n(y1)}` +
    `H${n(x2 - radius)}${arc} ${n(x2)} ${n(y1 + radius)}` +
    `V${n(y2 - radius)}${arc} ${n(x2 - radius)} ${n(y2)}` +
    `H${n(x1 + radius)}${arc} ${n(x1)} ${n(y2 - radius)}` +
    `V${n(y1 + radius)}${arc} ${n(x1 + radius)} ${n(y1)}Z`
  );
}

function triggerCutout(geo: Geo) {
  const layer = { x: 0, y: 0, w: geo.layerW, h: geo.layerH, r: 0 };
  return `path(evenodd, "${roundedRectPath(layer)} ${roundedRectPath(geo.trigger)}")`;
}

type PopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openHover: () => void;
  scheduleClose: () => void;
  align: Align;
  reduce: boolean;
  gooId: string;
  contentId: string;
  triggerId: string;
  progress: MotionValue<number>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error(`${component} must be used within <Popover>`);
  return context;
}

export function Popover({
  align = "start",
  className,
  children,
}: {
  align?: Align;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  const id = useId();
  const gooId = `${id}-goo`;
  const contentId = `${id}-content`;
  const triggerId = `${id}-trigger`;
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const progress = useMotionValue(0);
  const [open, setOpen] = useState(false);

  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), []);

  const openHover = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
  }, [cancelClose]);

  const hover = useHoverGesture(openHover, scheduleClose);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    const transition = reduce ? { duration: 0 } : open ? GOO_OPEN_SPRING : GOO_CLOSE_SPRING;
    const animation = animate(progress, open ? 1 : 0, transition);
    return () => animation.stop();
  }, [open, progress, reduce]);

  const close = useCallback(() => {
    setOpen(false);
    if (contentRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
  }, []);
  const isInContent = useCallback((target: Element) => Boolean(contentRef.current?.contains(target)), []);
  useDismiss(open, close, rootRef, isInContent);

  const context = useMemo<PopoverContextValue>(
    () => ({
      open,
      setOpen,
      openHover,
      scheduleClose,
      align,
      reduce,
      gooId,
      contentId,
      triggerId,
      progress,
      triggerRef,
      contentRef,
    }),
    [open, openHover, scheduleClose, align, reduce, gooId, contentId, triggerId, progress],
  );

  return (
    <PopoverContext.Provider value={context}>
      <span
        ref={rootRef}
        className={cn("relative isolate inline-flex", className)}
        {...hover}
      >
        {children}
      </span>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  className,
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const { open, setOpen, openHover, scheduleClose, contentId, triggerId, triggerRef } =
    usePopoverContext("PopoverTrigger");
  const tap = useRef<{ pointerType: string; wasOpen: boolean } | null>(null);

  return (
    <button
      {...props}
      ref={triggerRef}
      id={triggerId}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      data-state={open ? "open" : "closed"}
      onFocus={openHover}
      onBlur={scheduleClose}
      onPointerDown={(event) => {
        tap.current = { pointerType: event.pointerType, wasOpen: open };
      }}
      onPointerCancel={() => {
        tap.current = null;
      }}
      onKeyDown={() => {
        tap.current = null;
      }}
      onClick={() => {
        const pending = tap.current;
        tap.current = null;
        if (pending && pending.pointerType !== "mouse") setOpen(!pending.wasOpen);
      }}
      className={cn(
        "relative z-0 transition-[background-color,text-decoration-color] duration-200 ease-out data-[state=open]:bg-popover",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function PopoverContent({ className, children }: { className?: string; children: ReactNode }) {
  const { open, openHover, scheduleClose, align, reduce, gooId, contentId, triggerId, progress, triggerRef, contentRef } =
    usePopoverContext("PopoverContent");
  const mounted = useMounted();
  const hover = useHoverGesture(openHover, scheduleClose);
  const blobRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const geoRef = useRef<Geo>(null);
  const layout = usePopoverLayout(triggerRef, contentRef, mounted);
  const geo = useMemo(() => buildGeo(layout, align), [layout, align]);
  const [closedAtRest, setClosedAtRest] = useState(() => !open && progress.get() === 0);

  if (open && closedAtRest) setClosedAtRest(false);

  const paint = useCallback((g: Geo | null, p: number) => {
    if (!g?.layerW) return;
    const clip = clipAt(g, p);
    if (blobRef.current) blobRef.current.style.clipPath = clip;
    if (clipRef.current) clipRef.current.style.clipPath = clip;
  }, []);

  useLayoutEffect(() => {
    geoRef.current = geo;
    paint(geo, progress.get());
  }, [geo, progress, paint]);

  useMotionValueEvent(progress, "change", (p) => paint(geoRef.current, p));
  useMotionValueEvent(progress, "animationComplete", () => {
    if (!open && progress.get() === 0) setClosedAtRest(true);
  });

  if (!mounted) return null;

  const layerStyle = { left: geo.left, width: geo.layerW, height: geo.layerH };

  return createPortal(
    <div
      className="pointer-events-none fixed top-0 left-0 isolate z-9999 size-0"
      style={{
        visibility: layout && !closedAtRest ? "visible" : "hidden",
        transform: `translate3d(${layout?.left ?? 0}px, ${layout?.top ?? 0}px, 0)`,
      }}
    >
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <filter id={gooId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={GOO_STRENGTH} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        className="absolute top-0 -z-1"
        style={{ ...layerStyle, filter: reduce ? undefined : `url(#${gooId})`, clipPath: triggerCutout(geo) }}
      >
        <div className="absolute bg-popover" style={rectStyle(geo.trigger)} />
        <div ref={blobRef} className="absolute inset-0 bg-popover" style={{ clipPath: clipAt(geo, progress.get()) }} />
      </div>

      <div className="absolute top-0 z-10" style={layerStyle}>
        <div
          ref={clipRef}
          inert={!open}
          className={cn("absolute inset-0", open && "pointer-events-auto")}
          style={{ clipPath: clipAt(geo, progress.get()) }}
        >
          <div
            ref={contentRef}
            id={contentId}
            role="dialog"
            aria-labelledby={triggerId}
            className={cn("absolute w-max max-w-[min(92vw,20rem)] p-4", className)}
            style={{ left: geo.panel.x, top: geo.panel.y }}
            {...hover}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
