export type PositionIcon = "code" | "business" | "education";

export type Position = {
  id: string;
  title: string;
  start: string;
  end?: string;
  employmentType?: string;
  summary?: string;
  highlights?: string[];
  skills?: string[];
  icon?: PositionIcon;
  defaultOpen?: boolean;
};

export type ExperienceEntry = {
  id: string;
  organization: string;
  url?: string;
  logo?: string;
  logoInset?: boolean;
  about?: string;
  positions: Position[];
};

export const isCurrent = (entry: ExperienceEntry) => entry.positions.some((position) => !position.end);

export const WORK_EXPERIENCE: ExperienceEntry[] = [
  {
    id: "booking",
    organization: "Booking.com",
    url: "https://booking.com",
    logo: "/booking.com.png",
    about: "Online travel platform, headquartered in Amsterdam.",
    positions: [
      {
        id: "booking-swe",
        title: "Software Engineer",
        start: "2025-09",
        employmentType: "Full-time",
        summary:
          "Currently part of **Deals** within Accommodations Business Unit. Previously on **Insurance** within Trips Business Unit (Sep 2025 – Apr 2026), where I:",
        highlights: [
          "Led the technical implementation of an Insurance Web BFF (Node.js, GraphQL, Apollo Server, Apollo Federation), delivering a strongly typed federated API and deploying it to AWS.",
          "Migrated U.S. offer retrieval onto the BFF via a controlled A/B experiment, reducing offer-retrieval latency and lifting conversion by **1.5pp**.",
          "Owned the end-to-end launch of insurance products across **four markets** (Romania, Norway, Denmark, Hungary) for WEB and MDOT, scaling to **hundreds of policy sales per day**.",
        ],
        icon: "code",
        skills: ["TypeScript", "React", "Node.js", "GraphQL", "Apollo Federation", "AWS", "Jest"],
        defaultOpen: true,
      },
      {
        id: "booking-intern",
        title: "Software Engineer Intern",
        start: "2024-07",
        end: "2024-08",
        employmentType: "Full-time Internship",
        summary:
          "Assigned to **Capla**, an internal web team that facilitates interoperability across business unit tech stacks. During my internship I:",
        highlights: [
          "Improved Developer Experience by implementing and deploying a React Hydration Debugger, which impacted **~600 software engineers**.",
          "Tested and documented the debugger, and communicated with the community about the feature.",
          "Addressed and fixed an Apollo query error and improved test coverage.",
          "Communicated with different teams to address certain issues with Booking.com's design system.",
        ],
        icon: "code",
        skills: ["React", "TypeScript", "GraphQL", "Playwright"],
      },
    ],
  },
  {
    id: "topgg",
    organization: "Top.gg",
    url: "https://top.gg",
    logo: "/topgg.png",
    logoInset: true,
    about: "Discovery platform for bots, communities and more across online platforms.",
    positions: [
      {
        id: "topgg-fullstack",
        title: "Full Stack Engineer",
        start: "2026-03",
        employmentType: "Contract",
        highlights: [
          "Designed, implemented, and launched the frontend for the new Ads system, with backfill onto legacy auction slots to preserve inventory during rollout, generating **tens of thousands of euros in recurring monthly ad revenue**.",
          "Built a WYSIWYG editor enabling creators to publish rich content to the platform, resulting in a **37.8pp** increase in user-submitted content in the first month after launch.",
        ],
        icon: "code",
        skills: ["React", "Next.js", "GraphQL", "Redis", "Google Cloud"],
        defaultOpen: true,
      },
      {
        id: "topgg-community",
        title: "Community Manager",
        start: "2018-10",
        end: "2021-12",
        employmentType: "Full-time",
        summary:
          "Managed a diverse online community of millions of users. I worked on improving the user experience on the site by writing guidelines to protect our users and the site, and developed multiple applications to support moderation of the community and site.",
        icon: "business",
        skills: ["TypeScript", "Community Management", "Zendesk"],
      },
    ],
  },
  {
    id: "topstats",
    organization: "TopStats.gg",
    url: "https://topstats.gg",
    logo: "/topstats.gg.png",
    about: "Statistics for Discord bots and servers.",
    positions: [
      {
        id: "topstats-founder",
        title: "Founder & Full Stack Engineer",
        start: "2024-10",
        employmentType: "Full-time",
        summary:
          "TopStats.gg (previously DBLStatistics) is an analytical platform that provides statistics on Discord bots and servers.",
        highlights: [
          "Fully built the UI for both [bots.topstats.gg](https://bots.topstats.gg) and [servers.topstats.gg](https://servers.topstats.gg).",
          "Built the public API and its documentation at [docs.topstats.gg](https://docs.topstats.gg).",
          "Migrated bots.topstats.gg from EJS to React and redesigned the UI.",
        ],
        icon: "business",
        skills: ["TypeScript", "React", "Node.js", "Fastify", "Swagger", "Redis"],
      },
    ],
  },
  {
    id: "capisoft",
    organization: "Capisoft B.V.",
    url: "https://www.capisoft.com/",
    logo: "/capisoft.png",
    positions: [
      {
        id: "capisoft-fullstack",
        title: "Full Stack Engineer",
        start: "2023-02",
        end: "2023-05",
        employmentType: "Full-time",
        summary:
          "Developed a crypto-based CRM system for managing products and users, with analytical data on purchases, revenue, users and more.",
        icon: "code",
        skills: ["TypeScript", "React", "Node.js", "MongoDB"],
      },
    ],
  },
  {
    id: "parsons",
    organization: "Parsons Delcan",
    url: "https://www.parsons.com/",
    logo: "/delcan-mark.png",
    about: "Engineering and technology company.",
    positions: [
      {
        id: "parsons-intern",
        title: "Software Engineer Intern",
        start: "2020-06",
        end: "2021-04",
        employmentType: "Full-time",
        summary:
          "Worked alongside a team of engineers on a government contract for the Transport Department of Hong Kong, producing various tools and applications in the development of the Journey Time Indicator and Speed Map Panel System.",
        icon: "code",
        skills: ["Redis", "Python", "TypeScript", "EJS", "Node.js"],
      },
    ],
  },
];

export const EDUCATION: ExperienceEntry[] = [
  {
    id: "vu",
    organization: "Vrije Universiteit Amsterdam (VU Amsterdam)",
    url: "https://vu.nl",
    logo: "/vrije.png",
    about: "Public research university in Amsterdam.",
    positions: [
      {
        id: "vu-bsc",
        title: "BSc Computer Science",
        start: "2022-09",
        end: "2025-07",
        icon: "education",
      },
    ],
  },
];
