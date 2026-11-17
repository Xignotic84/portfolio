import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHeader } from "@/components/case-study/header";
import { Story } from "@/components/case-study/story";
import { StructuredData } from "@/components/layout/structured-data";
import { CASE_STUDY_PROJECTS, getCaseStudyProject } from "@/lib/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { topStatsQuery } from "@/lib/query/options";
import { projectBreadcrumbs } from "@/lib/structured-data";
import { getTopStatsSummary } from "@/lib/topstats";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_PROJECTS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getCaseStudyProject((await params).slug);
  if (!project) return {};

  return pageMetadata({
    title: project.name,
    description: project.caseStudy.summary,
    path: `/projects/${project.id}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const project = getCaseStudyProject((await params).slug);
  if (!project) notFound();

  const queryClient = new QueryClient();
  if (project.liveStat === "topstats-bots") {
    await queryClient.prefetchQuery({ ...topStatsQuery, queryFn: getTopStatsSummary, retry: false });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StructuredData data={projectBreadcrumbs(project)} />
      <article className="mx-auto max-w-3xl space-y-14 py-14 sm:pt-20">
        <CaseStudyHeader project={project} />
        <Story entries={project.caseStudy.entries} />
      </article>
    </HydrationBoundary>
  );
}
