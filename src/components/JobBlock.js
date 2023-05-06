import {Avatar, Box, Collapse, Fade, Flex, Heading, Tag, Text} from "@chakra-ui/react";
import {useState} from "react";

export default function JobBlock({position}) {

  const [isExpanded, setExpanded] = useState(false)

  return <Box cursor={position.url && 'pointer'} onClick={() => position.url && window.open(position.url, '_blank')}
              transition="all .25s ease" _hover={{transform: 'scale(1.02)', filter: "brightness(120%)",}} p={5} m={5}
              bg={'background.secondary'} maxW={'700px'} borderRadius={6}>
    <Flex position={'relative'}>
      <Avatar
          src={`/${position.image}.png`}
          borderRadius={7}
          name={position.company}
      />
      <Box ml={4}>
        <Heading>
          {position?.company ?? "Unknown"}
        </Heading>
        <Text opacity={0.7}>
          {position.title}
        </Text>

        <Collapse mt={2} startingHeight={44} in={isExpanded}>
          {position?.description ?? "Default description..."}
        </Collapse>

        {position.description.length > 200 && <Tag mt={1} cursor={'pointer'} onClick={(e) => {
          e.stopPropagation()
          setExpanded(!isExpanded)
        }}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Tag>}
      </Box>
      <Tag position={'absolute'} right={0} top={0}>
        {position.period}
      </Tag>
    </Flex>


  </Box>
}
