import { SHIRO_CASE_STUDY } from "@/lib/data/case-studies/shiro";
import { TOPSTATS_CASE_STUDY } from "@/lib/data/case-studies/topstats";

export type StoryImage = { src: string; alt: string };

export type StoryBlock =
  | { type: "paragraph"; text: string }
  | (StoryImage & { type: "image"; width: number; height: number; caption?: string })
  | {
      type: "compare";
      before: StoryImage & { label: string };
      after: StoryImage & { label: string };
      caption: string;
    }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] };

export type StoryEntry = {
  date?: string;
  title: string;
  blocks: StoryBlock[];
  source?: { label: string; href: string };
};

export type CaseStudy = {
  summary: string;
  role: string;
  period: string;
  team?: string;
  links?: { label: string; href: string }[];
  entries: StoryEntry[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  image: { src: string; fit: "cover" | "contain" };
  tags: string[];
  href?: string;
  featured?: boolean;
  liveStat?: "topstats-bots";
  caseStudy?: CaseStudy;
};

export type CaseStudyProject = Project & { caseStudy: CaseStudy };

export const PROJECTS: Project[] = [
  {
    id: "topstats",
    name: "TopStats.gg",
    description: "Statistics for Discord bots and servers. Previously DBL Statistics.",
    image: { src: "/topstats-project.png", fit: "cover" },
    tags: ["TypeScript", "React", "Fastify", "Redis"],
    href: "https://topstats.gg",
    featured: true,
    liveStat: "topstats-bots",
    caseStudy: TOPSTATS_CASE_STUDY,
  },
  {
    id: "shiro",
    name: "Shiro",
    description: "My first project: a multipurpose and moderation bot for Discord, built in 2018 and grown to 20,000 servers.",
    image: { src: "/shiro.png", fit: "contain" },
    tags: ["Node.js", "MongoDB", "Redis", "discord.js"],
    caseStudy: SHIRO_CASE_STUDY,
  },
];

export const CASE_STUDY_PROJECTS = PROJECTS.filter((project): project is CaseStudyProject => Boolean(project.caseStudy));

export const getCaseStudyProject = (id: string) => CASE_STUDY_PROJECTS.find((project) => project.id === id);
