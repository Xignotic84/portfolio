import React from 'react';
import Projectcard from './projectcard'

export default function Projects() {
  return (
    <div className='projects'>
      < Projectcard url='' image='/parsons' title='Parsons Delcan' position='Software Engineer Intern' date="June 2020 - April 2021"
                    description='At Delcan I work on systems relating to traffic systems integration and analysis for Highways in Hong Kong.'/>
      < Projectcard url='https://top.gg' image='/topgg' title='Top.gg' position='Community Manager' date="October 2018 - Present"
                    description="Managed a diverse online community of over 100, 000 members. I work on improving and enhancing users experience on the site by writing guidelines to protect our users and the site. I've developed multiple chat bots to help support the moderation of the community and site."/>
      < Projectcard url='http://dblstatistics.com' image='/dblstats' title='DBL Statistics' date="July 2020 - Present"
                    position='Full-Stack Developer'
                    description='DBL Statistics is an analytical project that uses data from top.gg. This project was unfunded and was worked on by myself and two others. We decided to take on this project to provide developers and community members regular and consistent data regarding the growth and progress of the bots they use and create.'/>
    </div>
  )
}
