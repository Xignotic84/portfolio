import {Box, Flex, Heading, Slide, Text} from "@chakra-ui/react";
import Socials from "./Socials";

export default function AboutMeBlock() {
  return <Box mt={100}>
    <Heading size={'4xl'}>
      Heya, I am Xignotic!
    </Heading>
    <Text mt={2} opacity={0.8} fontSize={'lg'}>
      I am a <Text as={'u'}>Full Stack Engineer</Text> based in Amsterdam, Netherlands. Currently studying at Vrije Universiteit Amsterdam.
    </Text>

    <Text mt={5} opacity={0.8} fontSize={'lg'}>
      I have a background in <Text as={'u'}>Full-Stack Development</Text> and <Text as={'u'}>Community Management</Text>, where I have worked for multiple years in different companies in these roles.
    </Text>


    <Text mt={5} opacity={0.8} fontSize={'lg'}>
      ☕ Certified Coffee Addict
    </Text>
    <Socials/>
  </Box>
}
