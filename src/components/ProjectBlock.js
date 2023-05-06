import {Box, Flex, Heading, Image} from "@chakra-ui/react";
import {useRouter} from "next/navigation";

export default function ProjectBlock({ project }) {
  const router = useRouter()
  return <Box cursor={'pointer'} onClick={() => router.push(project.url)} transition="all .25s ease" _hover={{ transform: 'scale(1.02)', filter: "brightness(120%)", }} p={5} m={5} bg={'background.secondary'} w={'350px'} borderRadius={6}>
    <Image alt={project.name} borderRadius={6} src={`/${project.image}.png`}/>
    <Heading mt={2} size={'md'}>
      {project?.name ?? "Unknown"}
    </Heading>
  </Box>
}
