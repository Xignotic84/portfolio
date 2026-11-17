import { ArrowUpRight } from "lucide-react";
import { CompanyLogo } from "@/components/experience/company-logo";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/motion/popover";
import { ExternalLink } from "@/components/ui/external-link";
import type { ExperienceEntry } from "@/lib/data/experience";
import { formatLength, formatPeriod } from "@/lib/format";
import { hostname } from "@/lib/utils";

export function CompanyHovercard({ entry }: { entry: ExperienceEntry }) {
  if (!entry.url) return entry.organization;

  const domain = hostname(entry.url);
  const roleCount = new Set(entry.positions.map((position) => position.title)).size;

  return (
    <Popover>
      <PopoverTrigger className="-mx-2 inline-flex h-8 items-center rounded-lg px-2 underline decoration-border-strong decoration-dotted underline-offset-4 data-[state=open]:decoration-transparent">
        {entry.organization}
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <CompanyLogo src={entry.logo} inset={entry.logoInset} size="lg" />
          <div className="min-w-0">
            <p className="truncate font-semibold">{entry.organization}</p>
            <p className="truncate text-xs text-muted-foreground">{domain}</p>
          </div>
        </div>

        {entry.about ? <p className="leading-relaxed text-muted-foreground">{entry.about}</p> : null}

        <div className="space-y-0.5 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">
            {formatLength(entry.positions)}
            {roleCount > 1 ? ` across ${roleCount} roles` : null}
          </p>
          {entry.positions.map((position) => (
            <p key={position.id}>{formatPeriod(position)}</p>
          ))}
        </div>

        <ExternalLink
          href={entry.url}
          className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
        >
          Visit {domain}
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </ExternalLink>
      </PopoverContent>
    </Popover>
  );
}
