import { CompanyHovercard } from "@/components/experience/company-hovercard";
import { CompanyLogo } from "@/components/experience/company-logo";
import { CurrentBadge } from "@/components/experience/current-badge";
import { ExperiencePosition } from "@/components/experience/position";
import { type ExperienceEntry, isCurrent } from "@/lib/data/experience";

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ol className="card divide-y">
      {entries.map((entry) => (
        <li key={entry.id} className="space-y-3 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <CompanyLogo src={entry.logo} inset={entry.logoInset} size="sm" />
            <h3 className="min-w-0 text-lg">
              <CompanyHovercard entry={entry} />
            </h3>
            {isCurrent(entry) ? <CurrentBadge entry={entry} /> : null}
          </div>

          <div className="relative space-y-1 before:absolute before:inset-y-3 before:left-3 before:w-px before:bg-border">
            {entry.positions.map((position) => (
              <ExperiencePosition key={position.id} position={position} />
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
