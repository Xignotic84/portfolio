import { BriefcaseBusiness, CodeXml, GraduationCap } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from "@/components/motion/collapsible";
import { RichText } from "@/components/ui/rich-text";
import { TagList } from "@/components/ui/tag-list";
import type { Position, PositionIcon } from "@/lib/data/experience";
import { formatLength, formatPeriod } from "@/lib/format";

const ICONS: Record<PositionIcon, typeof CodeXml> = {
  code: CodeXml,
  business: BriefcaseBusiness,
  education: GraduationCap,
};

function PositionSummary({ position }: { position: Position }) {
  const Icon = ICONS[position.icon ?? "business"];

  return (
    <>
      <span
        aria-hidden="true"
        className="relative z-10 mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border bg-muted text-muted-foreground"
      >
        <Icon className="size-3.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-snug font-medium text-balance">{position.title}</span>
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
          {position.employmentType ? (
            <>
              <span>{position.employmentType}</span>
              <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
            </>
          ) : null}
          <span>{formatPeriod(position)}</span>
          <span aria-hidden="true">·</span>
          <span>{formatLength([position])}</span>
        </span>
      </span>
    </>
  );
}

export function ExperiencePosition({ position }: { position: Position }) {
  const { summary, highlights, skills } = position;

  if (!summary && !highlights?.length && !skills?.length) {
    return (
      <div className="flex items-start gap-3 py-2">
        <PositionSummary position={position} />
      </div>
    );
  }

  return (
    <Collapsible defaultOpen={position.defaultOpen}>
      <CollapsibleTrigger className="-mx-2 w-[calc(100%+1rem)]">
        <PositionSummary position={position} />
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-1 pb-2 pl-9 text-sm leading-relaxed text-muted-foreground">
        {summary ? (
          <p className="text-pretty">
            <RichText text={summary} />
          </p>
        ) : null}
        {highlights?.length ? (
          <ul className="list-disc space-y-1.5 pl-4 marker:text-border-strong">
            {highlights.map((highlight) => (
              <li key={highlight} className="text-pretty">
                <RichText text={highlight} />
              </li>
            ))}
          </ul>
        ) : null}
        {skills?.length ? <TagList label="Skills" items={skills} className="pt-1" /> : null}
      </CollapsibleContent>
    </Collapsible>
  );
}
