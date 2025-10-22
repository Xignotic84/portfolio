import type {ExperienceItemType} from "@/components/WorkExperience/work-experience";
import {WorkExperience} from "@/components/WorkExperience/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "1",
    companyName: "Booking.com",
    companyUrl: "https://booking.com",
    companyLogo: "/booking.com.png",
    isCurrentEmployer: true,
    positions: [
      {
        id: "1-1",
        title: "Software Engineer",
        employmentPeriod: "September 2025 - Present",
        employmentType: "Full-time",
        description:
          "Currently assigned to Insurance within Trips Engineering",
        icon: "code",
        skills: ["TypeScript", "React", "Node.js", "Jest"],
      },
      {
        id: "1-2",
        title: "Software Engineer Intern",
        employmentPeriod: "July 2024 - August 2024",
        employmentType: "Full-time Internship",
        description:
          "Assigned to **Capla**, an internal web team that facilities interoperability across business unit tech-stacks. During my internship I:\n " +
          "1. Improved Developer Experience by implementing and deploying a React Hydration Debugger. That impacted **~600 software engineers**.\n" +
          "2. Tested and documented the debugger alongside communicating with the community regarding the feature.\n" +
          "3. Addressed and fixed an Apollo query error and improved test coverage.\n" +
          "4. Communicated with different teams to address certain issues with Booking.com\\'s design system.",
        icon: "code",
        skills: ["React", "TypeScript", "GraphQL", "Playwright"],
      },
    ],
  },
  {
    id: "2",
    companyName: "TopStats.gg",
    companyUrl: "https://topstats.gg",
    companyLogo: "topstats.gg.png",
    isCurrentEmployer: true,
    positions: [
      {
        id: "2-1",
        title: "Founder & Full-Stack Software Engineer",
        employmentPeriod: "October 2024 - Present",
        employmentType: "Full-time",
        description:
          "TopStats.gg (previously DBLStatistics) is an analytical platform that provides statistics on Discord Bots and Servers.\n" +
          "1. Built and developed the website initially using Chakra ui V3, then migrated to Shadcn/UI.\n" +
          "2. Built and documented TopStats.gg's API.",
        icon: "business",
        skills: ["TypeScript", "React", "Node.js", "Fastify", "Swagger", "Redis"],
      },
    ],
  },
  {
    id: "3",
    companyName: "Capisoft B.V.",
    companyLogo: "capisoft.png",
    positions: [
      {
        id: "3-1",
        title: "Full-Stack Software Engineer",
        employmentPeriod: "February 2023 - May 2023",
        employmentType: "Full-time",
        description:
          "Developed a crypto-based CRM system which provided management of products, users and provided analytical data on purchases, revenue, users and more.",
        icon: "code",
        skills: ["TypeScript", "React", "Node.js", "MongoDB"],
      },
    ],
  },
  {
    id: "4",
    companyName: "Parsons Delcan",
    companyUrl: 'https://www.parsons.com/',
    companyLogo: "parsons.png",
    positions: [
      {
        id: "4-1",
        title: "Software Engineer Intern",
        employmentPeriod: "June 2020 - April 2021",
        employmentType: "Full-time",
        description:
          "Worked alongside a team of engineers on a Government contract for the Transport Department of Hong Kong, producing various tools and applications in the development of Journey Time Indicator and Speed Map Panel System.",
        icon: "code",
        skills: ["Redis", "Python", "TypeScript", "React", "Node.js"],
      },
    ],
  },
  {
    id: "5",
    companyName: "Top.gg",
    companyUrl: 'https://top.gg',
    companyLogo: "topgg.png",
    positions: [
      {
        id: "5-1",
        title: "Community Manager",
        employmentPeriod: "October 2018 - December 2021",
        employmentType: "Full-time",
        description:
          "Managed a diverse online community of millions of users. I worked on improving and enhancing users experience on the site by writing guidelines to protect our users and the site. I\\'ve developed multiple applications to help support the moderation of the community and site.",
        icon: "business",
        skills: ["TypeScript", "Community Management", "Zendesk"],
      },
    ],
  },
];

const EDUCATION: ExperienceItemType[] = [
  {
    id: "1",
    companyName: "Vrije Universiteit Amsterdam (VU Amsterdam)",
    companyUrl: 'https://vu.nl',
    companyLogo: "/vrije.png",
    positions: [
      {
        id: "1-1",
        title: "BSc Computer Science",
        employmentPeriod: "September 2022 - July 2025",
        icon: "education",
      },
    ],
  },
]

export default function Experience() {
  return (
    <div className={'flex-row space-y-8 col-span-2'}>
      <div className={'flex-row space-y-4'}>
        <h2 className={'text-4xl'}>Experience</h2>
        <WorkExperience
          className="w-full rounded-lg border"
          experiences={WORK_EXPERIENCE}
        />
      </div>
      <div className={'flex-row space-y-4'}>
        <h2 className={'text-4xl'}>Education</h2>
        <WorkExperience
          className="w-full rounded-lg border"
          experiences={EDUCATION}
        />
      </div>
    </div>

  )
}
