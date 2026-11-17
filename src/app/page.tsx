import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { StructuredData } from "@/components/layout/structured-data";
import { Education, Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { topStatsQuery } from "@/lib/query/options";
import { HOME_GRAPH } from "@/lib/structured-data";
import { getTopStatsSummary } from "@/lib/topstats";

export const revalidate = 300;

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ ...topStatsQuery, queryFn: getTopStatsSummary, retry: false });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StructuredData data={HOME_GRAPH} />
      <Hero />

      <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
        <div className="space-y-14 lg:col-span-2">
          <Experience />
          <Education />
          <Projects />
        </div>
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <Stack />
        </aside>
      </div>
    </HydrationBoundary>
  );
}
