import "server-only";

export type TopStatsSummary = {
  totalBotCount: number;
};

export async function getTopStatsSummary(): Promise<TopStatsSummary> {
  const key = process.env.TOPSTATS_API_KEY;
  if (!key) throw new Error("TOPSTATS_API_KEY is not set");

  const res = await fetch("https://api.topstats.gg/discord/rankings/bots?limit=1", {
    headers: { Authorization: key },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`TopStats.gg responded ${res.status}`);

  const { totalBotCount } = (await res.json()) as { totalBotCount?: unknown };
  if (typeof totalBotCount !== "number") throw new Error("TopStats.gg response is missing totalBotCount");
  return { totalBotCount };
}
