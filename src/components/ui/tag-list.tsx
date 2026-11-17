import { cn } from "@/lib/utils";

export function TagList({ label, items, className }: { label: string; items: string[]; className?: string }) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item} className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
          {item}
        </li>
      ))}
    </ul>
  );
}
