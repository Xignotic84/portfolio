"use client";

import { useRef } from "react";

type BoundaryEvent = { pointerId: number; pointerType: string; buttons: number };

const isHoveringPointer = (event: BoundaryEvent) => event.pointerType !== "touch" && event.buttons === 0;

export function useHoverGesture(onEnter: () => void, onLeave: () => void) {
  const contact = useRef(new Set<number>());

  return {
    onPointerEnter: (event: BoundaryEvent) => {
      if (isHoveringPointer(event)) {
        contact.current.delete(event.pointerId);
        onEnter();
      } else {
        contact.current.add(event.pointerId);
      }
    },
    onPointerLeave: (event: BoundaryEvent) => {
      const arrivedInContact = contact.current.delete(event.pointerId);
      if (!arrivedInContact && event.pointerType !== "touch") onLeave();
    },
  };
}
