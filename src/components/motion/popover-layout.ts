"use client";

import { type RefObject, useCallback, useLayoutEffect, useState } from "react";

export type PopoverLayout = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: number;
  contentWidth: number;
  contentHeight: number;
};

function sameLayout(a: PopoverLayout | null, b: PopoverLayout) {
  return a !== null && (Object.keys(b) as (keyof PopoverLayout)[]).every((key) => a[key] === b[key]);
}

export function usePopoverLayout(
  triggerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  active: boolean,
) {
  const [layout, setLayout] = useState<PopoverLayout | null>(null);

  const update = useCallback(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;
    if (!trigger || !content) return;

    const { left, top, width, height } = trigger.getBoundingClientRect();
    const next: PopoverLayout = {
      left,
      top,
      width,
      height,
      radius: parseFloat(getComputedStyle(trigger).borderTopLeftRadius) || 0,
      contentWidth: content.offsetWidth,
      contentHeight: content.offsetHeight,
    };
    setLayout((current) => (sameLayout(current, next) ? current : next));
  }, [contentRef, triggerRef]);

  useLayoutEffect(() => {
    update();
    if (!active) return;

    const trigger = triggerRef.current;
    const content = contentRef.current;
    const observer = new ResizeObserver(update);
    if (trigger) observer.observe(trigger);
    if (content) observer.observe(content);

    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [active, contentRef, triggerRef, update]);

  return layout;
}
