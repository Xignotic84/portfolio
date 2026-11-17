import { Popover, PopoverContent, PopoverTrigger } from "@/components/motion/popover";
import { PulseDot } from "@/components/ui/pulse-dot";
import type { ExperienceEntry } from "@/lib/data/experience";
import { formatMonth } from "@/lib/format";

export function CurrentBadge({ entry }: { entry: ExperienceEntry }) {
  const ongoingStarts = entry.positions.filter((position) => !position.end).map((position) => position.start);
  const since = formatMonth(ongoingStarts.sort()[0] ?? entry.positions[0].start);

  return (
    <Popover align="end" className="ml-auto">
      <PopoverTrigger aria-label="Currently working here" className="grid size-6 place-items-center rounded-full">
        <PulseDot />
      </PopoverTrigger>
      <PopoverContent className="p-3">
        <p className="text-sm font-medium">Currently working here</p>
        <p className="text-xs text-muted-foreground">Since {since}</p>
      </PopoverContent>
    </Popover>
  );
}
