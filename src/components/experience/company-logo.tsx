import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: { px: 24, className: "size-6 rounded-md", inset: "p-[3px]" },
  lg: { px: 40, className: "size-10 rounded-lg", inset: "p-1.5" },
};

export function CompanyLogo({ src, inset, size }: { src?: string; inset?: boolean; size: keyof typeof SIZES }) {
  const { px, className, inset: insetClass } = SIZES[size];
  if (!src) return <span aria-hidden="true" className={cn("shrink-0 bg-muted", className)} />;

  return (
    <Image
      src={src}
      alt=""
      width={px}
      height={px}
      className={cn("shrink-0 border bg-background object-contain", className, inset && insetClass)}
    />
  );
}
