import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/ui/section";
import { PROJECTS } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const regular = PROJECTS.filter((project) => !project.featured);
const unpaired = regular.length % 2 === 1 ? regular.at(-1) : undefined;

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((project) => {
          const wide = Boolean(project.featured) || project === unpaired;
          return (
            <li key={project.id} className={cn(wide && "sm:col-span-2")}>
              <ProjectCard project={project} wide={wide} />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
