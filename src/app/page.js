'use client'

import {Box, Divider, Flex, Heading, SimpleGrid, useMediaQuery} from "@chakra-ui/react";
import JobBlock from "../components/JobBlock";
import ProjectBlock from "../components/ProjectBlock";
import AboutMeBlock from "../components/AboutMeBlock";
import TopSpotifyBlock from "../components/TopSpotifyBlock";


const positions = [
  {
    company: 'Booking.com',
    image: 'booking.com',
    url: 'https://booking.com/',
    title: 'Software Engineer',
    period: 'September 2025 - Present',
    description: 'Joining in September as a Software Engineer Graduate'
  },
  {
    company: 'TopStats.gg',
    image: 'topstats.gg',
    url: 'https://dblstatistics.com',
    title: 'Founder and Full-Stack Engineer',
    period: 'June 2020 - October 2024',
    description: 'TopStats.gg (previously DBLStatistics) is an analytical platform that provides statistics on Discord Bots and Servers.',
    items: [
      'Built and developed the website initially using Chakra ui V3, then migrated to Shadcn/UI.',
      "Built and documented TopStats.gg's API.",
    ]
  },
  {
    company: 'Booking.com',
    image: 'booking.com',
    url: 'https://booking.com/',
    title: 'Software Engineer Intern',
    period: 'July 2024 - August 2024',
    description: 'Assigned to Capla, an internal web team that facilities interoperability across business unit\n' +
        'tech-stacks. During my internship I:',
    items: [
      'Improved Developer Experience by implementing and deploying a React Hydration Debugger. That impacted ~600 software engineers.',
      'Tested and documented the debugger alongside communicating with the community regarding the feature.',
      'Addressed and fixed an Apollo query error and improved test coverage.',
      'Communicated with different teams to address certain issues with Booking.com\'s design system.'
    ]
  },
  {
    company: 'Capisoft B.V.',
    image: 'capisoft',
    url: 'https://www.capisoft.nl/',
    title: 'Full-Stack Engineer',
    period: 'February 2023 - May 2023',
    description: 'Developed a crypto-based CRM system which provided management of products, users and provided analytical data on purchases, revenue, users and more.'
  },
  {
    company: 'DBL Statistics',
    image: 'dblstats',
    url: 'https://dblstatistics.com',
    title: 'Full-Stack Engineer',
    period: 'June 2020 - October 2024',
    description: 'DBL Statistics is an analytical project that uses data from Top.gg. This project was unfunded and was worked on by myself and two others. We decided to take on this project to provide developers and community members regular and consistent data regarding the growth and progress of the bots they use and create.'
  },
  {
    company: 'Parsons Delcan',
    image: 'parsons',
    url: 'http://www.delcan.com/',
    title: 'Software Engineer Intern',
    period: 'June 2020 - April 2021',
    description: 'Worked alongside a team of engineers on a Government contract for the Transport Department of Hong Kong, producing various tools and applications in the development of Journey Time Indicator and Speed Map Panel System.'
  },
  {
    company: 'Top.gg',
    image: 'topgg',
    url: 'https://top.gg',
    title: 'Community Manager',
    period: 'October 2018 - December 2021',
    description: 'Managed a diverse online community of millions of users. I work on improving and enhancing users experience on the site by writing guidelines to protect our users and the site. I\'ve developed multiple applications to help support the moderation of the community and site.'
  },
  {
    company: 'Shiro',
    image: 'shiro',
    title: 'Founder and Full Stack Engineer',
    period: 'September 2018 - December 2021',
    description: 'I am the founder of Shiro, a previously multi-purpose Discord Bot which at the time, serviced over 20,000 servers. Shiro also provided a public image API for use.'
  }
]

const projects = [
  {
    name: 'DBL Statistics',
    image: 'dblstats-project',
    url: 'https://dblstatistics.com'
  },
  {
    name: 'URL Shortener',
    image: 'url-shortener',
    url: 'https://shrt.xignotic.dev'
  }
]


export default function Home() {
  const [isMobile] = useMediaQuery("(min-width: 800px)")

  return (
      <>
        <Box m={5}>
          <AboutMeBlock/>
        </Box>
        <Divider/>
        <Flex flexDirection={isMobile ? 'row' : 'column'}>
          <Box>
            <Heading mt={5} ml={5} size={'lg'}>
              Positions
            </Heading>
            <SimpleGrid>
              {positions.map((p, i) => {
                return <JobBlock key={i} position={p}/>
              })}
            </SimpleGrid>
          </Box>
          <TopSpotifyBlock/>
        </Flex>
        <Divider/>
        <Box>
          <Heading mt={5} ml={5} size={'lg'}>
            Projects
          </Heading>
          <Box display={'flex'} flexDirection={!isMobile && 'column'}>
            {projects.map((p, i) => {
              return <ProjectBlock key={i} project={p}/>
            })}
          </Box>
        </Box>

      </>
  )
}
