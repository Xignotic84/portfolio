import type { CaseStudy } from "@/lib/data/projects";

export const TOPSTATS_CASE_STUDY: CaseStudy = {
  summary:
    "How I rebuilt DBL Statistics as TopStats.gg: a React frontend, a public API about twice as fast, and free statistics for Discord servers.",
  role: "Founder & Full Stack Engineer",
  period: "Oct 2024 – Present",
  team: "Built with Marco and Luke",
  links: [
    { label: "topstats.gg", href: "https://topstats.gg" },
    { label: "Bot statistics", href: "https://bots.topstats.gg" },
    { label: "Server statistics", href: "https://servers.topstats.gg" },
    { label: "API docs", href: "https://docs.topstats.gg" },
    { label: "Blog", href: "https://blog.topstats.gg" },
  ],
  entries: [
    {
      date: "2024-10",
      title: "Rebuilding DBL Statistics as TopStats",
      blocks: [
        {
          type: "paragraph",
          text: "DBL Statistics tracked statistics for Discord bots, but it ran on EJS templates, plain HTML and MongoDB. It had become hard to maintain and slowed down every new feature, so we announced a full rebuild under a new name: TopStats.",
        },
        {
          type: "paragraph",
          text: "I moved the frontend from EJS to **React**, first with Chakra UI v3 and later migrating to shadcn/ui. The redesign also targeted the most visible problem on the old site: graphs that could take nine seconds to load.",
        },
        {
          type: "paragraph",
          text: "On the data side, Luke migrated **1.8 billion rows** from MongoDB to Timescale with zero downtime. He wrote about it [on the blog](https://blog.topstats.gg/how-we-migrated-1-8-billion-rows-from-mongodb-to-timescale-with-zero-downtime/).",
        },
        {
          type: "compare",
          before: {
            label: "DBL Statistics",
            src: "/dblstats-project.png",
            alt: "The DBL Statistics homepage before the rebuild",
          },
          after: {
            label: "TopStats",
            src: "/topstats-project.png",
            alt: "The TopStats.gg homepage today",
          },
          caption: "DBL Statistics before the rebuild, and TopStats today. Drag to compare.",
        },
      ],
      source: { label: "The Future of DBL Statistics", href: "https://blog.topstats.gg/the-future-of-dbl-statistics/" },
    },
    {
      date: "2024-11",
      title: "Closed beta",
      blocks: [
        {
          type: "paragraph",
          text: "Just over a month after the announcement, the redesigned home and bot pages went to a closed beta for supporters. It ran for a few weeks to gather feedback and catch bugs while we finished the API and the remaining pages.",
        },
      ],
      source: { label: "Sneak Peeks and Closed Beta", href: "https://blog.topstats.gg/sneak-peeks-and-closed-beta/" },
    },
    {
      date: "2024-11",
      title: "A faster public API",
      blocks: [
        {
          type: "paragraph",
          text: "I built the new public API and its documentation at [docs.topstats.gg](https://docs.topstats.gg). Requests take about **half the time** they did on the legacy DBL Statistics API, and the bot graph route went from almost 13 seconds on a first request to **153 ms**.",
        },
        {
          type: "table",
          caption: "First-request response times, legacy API vs. TopStats API.",
          columns: ["Route", "Legacy", "TopStats"],
          rows: [
            ["Bot data", "397 ms", "134 ms"],
            ["Bot graph data", "12.99 s", "153 ms"],
            ["Rankings", "660 ms", "193 ms"],
            ["User bots", "395 ms", "185 ms"],
          ],
        },
        {
          type: "paragraph",
          text: "It also returns more data than before, such as a bot's Discord tags and the percentage change in its votes.",
        },
      ],
      source: { label: "TopStats API Is Now Available", href: "https://blog.topstats.gg/topstats-api-is-now-available/" },
    },
    {
      date: "2024-11",
      title: "Open beta",
      blocks: [
        {
          type: "paragraph",
          text: "The redesigned site opened to everyone the same day. Bot pages could show all monthly data at once instead of a one-year limit, rankings got better sorting, search could jump straight to a bot, and the compare page took bot names instead of IDs.",
        },
      ],
      source: { label: "TopStats Open Beta now available!", href: "https://blog.topstats.gg/topstats-open-beta-now-available/" },
    },
    {
      date: "2025-07",
      title: "Full release",
      blocks: [
        {
          type: "paragraph",
          text: "After about seven months in open beta, [bots.topstats.gg](https://bots.topstats.gg) left beta with its full release on **4 July 2025**.",
        },
      ],
    },
    {
      date: "2026-10",
      title: "Discord server statistics",
      blocks: [
        {
          type: "paragraph",
          text: "I built the frontend for [servers.topstats.gg](https://servers.topstats.gg), which brings the same kind of analytics to Discord servers, free for servers of any size. It shows which games members play, how active each channel is, whether members stay or leave, and overall message activity.",
        },
        {
          type: "image",
          src: "/topstats-servers.png",
          width: 1920,
          height: 911,
          alt: "The Members page of the servers.topstats.gg dashboard",
          caption: "The Members page: joins and leaves over time, member growth, and activity per member.",
        },
        {
          type: "paragraph",
          text: "Premium adds deeper views, like underused channels, when members are most active, and individual member activity. TopStats never reads message contents.",
        },
      ],
      source: { label: "Discord Server Statistics are here!", href: "https://blog.topstats.gg/discord-server-statistics-are-here/" },
    },
  ],
};
