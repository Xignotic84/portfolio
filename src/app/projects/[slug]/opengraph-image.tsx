import { notFound } from "next/navigation";
import { CASE_STUDY_PROJECTS, getCaseStudyProject } from "@/lib/data/projects";
import { OG_SIZE, renderOgCard } from "@/lib/og/card";
import { site } from "@/lib/site";

export const alt = `Project case study by ${site.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return CASE_STUDY_PROJECTS.map((project) => ({ slug: project.id }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getCaseStudyProject((await params).slug);
  if (!project) notFound();

  return renderOgCard({
    title: project.name,
    subtitle: project.caseStudy.summary,
    chips: ["Case study", ...project.tags.slice(0, 3)],
  });
}
