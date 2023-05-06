import {Flex, Icon, IconButton} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import {IoLogoGithub, IoLogoTwitter, IoMailOutline} from "react-icons/io5";

export default function Socials() {
  const router = useRouter()

  return <Flex gap={5} m={2}>
    <IconButton aria-label={'Github'} icon={<Icon boxSize={8} as={IoLogoGithub}/>} onClick={() => window.open('https://github.com/Xignotic84', '_blank')}/>
    <IconButton aria-label={'Twitter'} icon={<Icon boxSize={8} as={IoLogoTwitter}/>} onClick={() => window.open('https://twitter.com/Xignotic', '_blank')}/>
    <IconButton aria-label={'Email'} icon={<Icon boxSize={7} as={IoMailOutline}/>} onClick={() => window.open('mailto:@contact@xignotic.dev', '_blank')}/>
  </Flex>
}
