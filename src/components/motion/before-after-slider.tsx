"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type AnimationPlaybackControls,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import {
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { EASE_IN_OUT, SPRING_GLIDE, SPRING_MOUSE, SPRING_PRESS } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

const TOUCH_SLOP = 6;
const HANDLE_RADIUS = 20;
const HINT_REACH = 10;
const HINT_DURATION = 1.6;
const BEND_SPEED = 250;
const BEND_MAX = 0.12;
const CHEVRON_SPLIT = { rest: 0, hover: 1.5, drag: 3 };
const CHIP_CLASS =
  "pointer-events-none absolute top-3 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm";

const clamp = (value: number) => Math.min(100, Math.max(0, value));
const round = (value: number) => Math.round(value * 100) / 100;

function capturePointer(element: Element, pointerId: number) {
  try {
    element.setPointerCapture(pointerId);
  } catch {}
}

function releasePointer(element: Element, pointerId: number) {
  try {
    if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
  } catch {}
}

type Gesture = {
  id: number;
  left: number;
  width: number;
  startX: number;
  startY: number;
  offset: number;
  active: boolean;
};

export function BeforeAfterSlider({
  before,
  after,
  label,
  beforeLabel,
  afterLabel,
  className,
}: {
  before: ReactNode;
  after: ReactNode;
  label: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const hoverCapable = useHoverCapable();
  const [current, setCurrent] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const gesture = useRef<Gesture | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { once: true, amount: 0.6 });
  const hinted = useRef(false);
  const hintRun = useRef<AnimationPlaybackControls | null>(null);
  const glide = useRef(false);

  const position = useMotionValue(current);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const velocity = useVelocity(position);
  const pull = useTransform(velocity, [-BEND_SPEED, 0, BEND_SPEED], [-1, 0, 1]);
  const bend = useSpring(useTransform(pull, (amount) => (reduce ? 0 : amount)), SPRING_MOUSE);
  const clipPath = useTransform([position, bend, width, height], ([p, amount, w, h]: number[]) => {
    if (!w || !h) return `inset(0 ${100 - p}% 0 0)`;
    const middle = (p / 100) * w;
    const trail = amount * BEND_MAX * h;
    return `path("M0 0 L${middle - trail} 0 Q${middle + trail} ${h / 2} ${middle - trail} ${h} L0 ${h} Z")`;
  });
  const lineD = useTransform([position, bend, width, height], ([p, amount, w, h]: number[]) => {
    const trail = w ? ((amount * BEND_MAX * h) / w) * 100 : 0;
    return `M${p - trail} 0 Q${p + trail} 50 ${p - trail} 100`;
  });
  const dividerX = useTransform(position, (p) => `${p}%`);
  const beforeOpacity = useTransform(position, [8, 22], [0, 1]);
  const afterOpacity = useTransform(position, [78, 92], [1, 0]);

  useLayoutEffect(() => {
    if (reduce || !glide.current) {
      position.stop();
      if (reduce) position.jump(current);
      else position.set(current);
      return;
    }
    glide.current = false;
    animate(position, current, { type: "spring", ...SPRING_GLIDE });
  }, [current, position, reduce]);

  useEffect(() => () => position.stop(), [position]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const rect = frame.getBoundingClientRect();
      width.set(rect.width);
      height.set(rect.height);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [width, height]);

  useEffect(() => {
    if (!inView || reduce || hinted.current) return;
    const from = position.get();
    const run = animate(position, [from, Math.min(100, from + HINT_REACH), Math.max(0, from - HINT_REACH), from], {
      duration: HINT_DURATION,
      ease: EASE_IN_OUT,
      times: [0, 0.3, 0.7, 1],
      delay: 0.25,
    });
    hintRun.current = run;
    run.then(() => {
      if (hintRun.current !== run) return;
      hintRun.current = null;
      hinted.current = true;
    });
    return () => {
      if (hintRun.current !== run) return;
      run.stop();
      hintRun.current = null;
      position.jump(from);
    };
  }, [inView, reduce, position]);

  const stopHint = () => {
    hinted.current = true;
    if (!hintRun.current) return;
    hintRun.current.stop();
    hintRun.current = null;
    position.jump(current);
  };

  const commit = (next: number, smooth: boolean) => {
    const clean = round(clamp(next));
    if (clean === current) return;
    glide.current = smooth;
    setCurrent(clean);
  };

  const fromPointer = (active: Gesture, clientX: number) => ((clientX - active.left - active.offset) / active.width) * 100;

  const start = (event: PointerEvent<HTMLDivElement>, active: Gesture) => {
    active.active = true;
    setDragging(true);
    capturePointer(event.currentTarget, event.pointerId);
    handleRef.current?.focus({ preventScroll: true });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || gesture.current) return;
    stopHint();
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width) return;
    const dividerPx = (position.get() / 100) * rect.width;
    const pointerPx = event.clientX - rect.left;
    const onHandle = Math.abs(pointerPx - dividerPx) <= HANDLE_RADIUS;
    const active: Gesture = {
      id: event.pointerId,
      left: rect.left,
      width: rect.width,
      startX: event.clientX,
      startY: event.clientY,
      offset: onHandle ? pointerPx - dividerPx : 0,
      active: false,
    };
    gesture.current = active;
    if (event.pointerType === "touch") return;
    event.preventDefault();
    start(event, active);
    if (!onHandle) commit(fromPointer(active, event.clientX), true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const active = gesture.current;
    if (!active || active.id !== event.pointerId) return;
    if (!active.active) {
      const dx = Math.abs(event.clientX - active.startX);
      const dy = Math.abs(event.clientY - active.startY);
      if (dx < TOUCH_SLOP && dy < TOUCH_SLOP) return;
      if (dy >= dx) {
        gesture.current = null;
        return;
      }
      start(event, active);
    }
    commit(fromPointer(active, event.clientX), false);
  };

  const end = (event: PointerEvent<HTMLDivElement>) => {
    const active = gesture.current;
    if (!active || active.id !== event.pointerId) return;
    gesture.current = null;
    if (!active.active && event.type === "pointerup") commit(fromPointer(active, event.clientX), true);
    setDragging(false);
    releasePointer(event.currentTarget, event.pointerId);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 1;
    const next = {
      ArrowRight: current + step,
      ArrowUp: current + step,
      ArrowLeft: current - step,
      ArrowDown: current - step,
      PageUp: current + 10,
      PageDown: current - 10,
      Home: 0,
      End: 100,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    stopHint();
    commit(next, true);
  };

  const split = reduce ? 0 : CHEVRON_SPLIT[dragging ? "drag" : hovered ? "hover" : "rest"];

  return (
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onLostPointerCapture={(event) => {
        if (event.target === event.currentTarget) end(event);
      }}
      onDragStart={(event) => event.preventDefault()}
      className={cn(
        "relative isolate w-full touch-pan-y overflow-hidden rounded-2xl bg-muted select-none [-webkit-touch-callout:none]",
        dragging ? "cursor-grabbing" : "cursor-ew-resize",
        className,
      )}
    >
      <div className="absolute inset-0">{after}</div>
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        {before}
      </motion.div>

      <div aria-hidden="true">
        <motion.span className={cn(CHIP_CLASS, "left-3")} style={{ opacity: beforeOpacity }}>
          {beforeLabel}
        </motion.span>
        <motion.span className={cn(CHIP_CLASS, "right-3")} style={{ opacity: afterOpacity }}>
          {afterLabel}
        </motion.span>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        <motion.path
          d={lineD}
          fill="none"
          stroke="rgb(0 0 0 / 0.14)"
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={{ strokeWidth: dragging && !reduce ? 5.5 : 4 }}
          transition={SPRING_PRESS}
        />
        <motion.path
          d={lineD}
          fill="none"
          stroke="white"
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={{ strokeWidth: dragging && !reduce ? 3.5 : 2 }}
          transition={SPRING_PRESS}
        />
      </svg>

      <motion.div className="pointer-events-none absolute inset-0" style={{ x: dividerX }}>
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            ref={handleRef}
            role="slider"
            tabIndex={0}
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(current)}
            aria-valuetext={`${Math.round(current)}% ${beforeLabel}`}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            onPointerEnter={(event) => {
              if (hoverCapable && event.pointerType !== "touch") setHovered(true);
            }}
            onPointerLeave={() => setHovered(false)}
            animate={{ scale: reduce ? 1 : dragging ? 1.08 : hovered ? 1.04 : 1 }}
            transition={SPRING_PRESS}
            className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-white text-neutral-900 ring-1 ring-black/12"
          >
            <motion.span aria-hidden="true" animate={{ x: -split }} transition={SPRING_PRESS} className="-mr-1 flex">
              <ChevronLeft className="size-3.5" strokeWidth={2.5} />
            </motion.span>
            <motion.span aria-hidden="true" animate={{ x: split }} transition={SPRING_PRESS} className="-ml-1 flex">
              <ChevronRight className="size-3.5" strokeWidth={2.5} />
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
