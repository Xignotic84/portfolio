import type { CaseStudy } from "@/lib/data/projects";

export const SHIRO_CASE_STUDY: CaseStudy = {
  summary:
    "Shiro, my first project: a multipurpose and moderation bot for Discord built with Node.js and discord.js, grown to 20,000 servers.",
  role: "Creator",
  period: "2018 – 2021",
  entries: [
    {
      date: "2018",
      title: "My first project",
      blocks: [
        {
          type: "paragraph",
          text: "Shiro was the first project I built: a **multipurpose and moderation bot** for Discord servers, written in Node.js with discord.js.",
        },
        {
          type: "paragraph",
          text: "It gave server staff moderation tools to keep their communities in order, and gave members general-purpose commands to use day to day.",
        },
      ],
    },
    {
      title: "Growing to 20,000 servers",
      blocks: [
        {
          type: "paragraph",
          text: "Server owners kept adding it to their communities, and Shiro grew to **20,000 servers**. Discord requires bots in more than 2,500 servers to split into shards, so it ran as multiple shards instead of a single process.",
        },
      ],
    },
    {
      date: "2021",
      title: "Handing it off",
      blocks: [
        {
          type: "paragraph",
          text: "Around 2021, I handed the project off. Shiro is where I first built something for real users at scale, and it led into my later work in the Discord ecosystem at Top.gg and TopStats.gg.",
        },
      ],
    },
  ],
};
