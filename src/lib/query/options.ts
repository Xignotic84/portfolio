import { queryOptions } from "@tanstack/react-query";
import type { TopStatsSummary } from "@/lib/topstats";

const FIVE_MINUTES = 5 * 60 * 1000;

export const topStatsQuery = queryOptions({
  queryKey: ["topstats", "summary"],
  queryFn: async (): Promise<TopStatsSummary> => {
    const res = await fetch("/api/topstats");
    if (!res.ok) throw new Error(`/api/topstats responded ${res.status}`);
    return res.json();
  },
  staleTime: FIVE_MINUTES,
  refetchInterval: FIVE_MINUTES,
});
