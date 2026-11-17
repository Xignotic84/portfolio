import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectMedia } from "@/components/projects/project-media";
import { TopStatsBotCount } from "@/components/projects/topstats-bot-count";
import { ExternalLink } from "@/components/ui/external-link";
import { TagList } from "@/components/ui/tag-list";
import type { Project } from "@/lib/data/projects";
import { cn, hostname } from "@/lib/utils";

const STRETCHED_LINK = "outline-none after:absolute after:inset-0";

const MEDIA_SIZES = {
  wide: "(min-width: 1024px) 620px, 100vw",
  half: "(min-width: 1024px) 310px, (min-width: 640px) 50vw, 100vw",
};

export function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  const { name, description, tags, href, caseStudy, liveStat } = project;
  const caseStudyPath = caseStudy ? `/projects/${project.id}` : undefined;
  const linked = Boolean(caseStudyPath || href);
  const Arrow = caseStudyPath ? ArrowRight : ArrowUpRight;
  const subtitle = [caseStudyPath && "Case study", href && hostname(href)].filter(Boolean).join(" · ");

  return (
    <article
      className={cn(
        "group card relative flex h-full flex-col overflow-hidden transition-colors",
        linked && "hover:border-border-strong has-focus-visible:outline-2",
      )}
    >
      <ProjectMedia
        project={project}
        sizes={wide ? MEDIA_SIZES.wide : MEDIA_SIZES.half}
        className={cn("border-b", wide ? "aspect-2/1" : "aspect-16/10")}
        zoomOnHover
      />

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg">
              {caseStudyPath ? (
                <Link href={caseStudyPath} className={STRETCHED_LINK}>
                  {name}
                </Link>
              ) : href ? (
                <ExternalLink href={href} className={STRETCHED_LINK}>
                  {name}
                </ExternalLink>
              ) : (
                name
              )}
            </h3>
            {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
          </div>
          {linked ? (
            <Arrow
              aria-hidden="true"
              className={cn(
                "mt-1 size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground",
                !caseStudyPath && "group-hover:-translate-y-0.5",
              )}
            />
          ) : null}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        {liveStat === "topstats-bots" ? <TopStatsBotCount /> : null}
        <TagList label="Tech" items={tags} className="mt-auto pt-1" />
      </div>
    </article>
  );
}
