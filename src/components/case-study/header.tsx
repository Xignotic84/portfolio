import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/motion/button";
import { ProjectMedia } from "@/components/projects/project-media";
import { TopStatsBotCount } from "@/components/projects/topstats-bot-count";
import { TagList } from "@/components/ui/tag-list";
import type { CaseStudyProject } from "@/lib/data/projects";

export function CaseStudyHeader({ project }: { project: CaseStudyProject }) {
  const { caseStudy } = project;
  const facts = [
    { label: "Role", value: caseStudy.role },
    { label: "Period", value: caseStudy.period },
    ...(caseStudy.team ? [{ label: "Team", value: caseStudy.team }] : []),
  ];

  return (
    <header className="space-y-6">
      <ButtonLink href="/#projects" variant="ghost" size="sm" className="-ml-3">
        <ArrowLeft aria-hidden="true" className="size-4" />
        All projects
      </ButtonLink>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl">{project.name}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{caseStudy.summary}</p>
        {project.liveStat === "topstats-bots" ? <TopStatsBotCount /> : null}
      </div>

      <ProjectMedia
        project={project}
        sizes="(min-width: 768px) 768px, 100vw"
        className="aspect-2/1 rounded-2xl border"
        preload
      />

      <dl className="card grid gap-4 p-4 text-sm sm:grid-cols-3 sm:p-5">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs text-muted-foreground">{fact.label}</dt>
            <dd className="mt-0.5 font-medium">{fact.value}</dd>
          </div>
        ))}
        <div className="sm:col-span-3">
          <dt className="sr-only">Stack</dt>
          <dd>
            <TagList label="Stack" items={project.tags} />
          </dd>
        </div>
      </dl>

      {caseStudy.links?.length ? (
        <ul className="-ml-3 flex flex-wrap gap-1">
          {caseStudy.links.map((link) => (
            <li key={link.href}>
              <ButtonLink href={link.href} variant="ghost" size="sm" external>
                {link.label}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </ButtonLink>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
