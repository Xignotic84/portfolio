"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { PulseDot } from "@/components/ui/pulse-dot";
import { topStatsQuery } from "@/lib/query/options";

export function TopStatsBotCount() {
  const { data } = useQuery(topStatsQuery);
  if (!data) return null;

  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <PulseDot />
      <AnimatedNumber value={data.totalBotCount} className="font-medium text-foreground" />
      bots tracked
    </p>
  );
}
