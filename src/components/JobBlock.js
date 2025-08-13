import {
  Avatar,
  Box,
  Collapse,
  Flex,
  Heading,
  ListItem,
  Tag,
  Text,
  UnorderedList,
  useMediaQuery
} from "@chakra-ui/react";
import {useState} from "react";

export default function JobBlock({position}) {
  const [isMobile] = useMediaQuery("(min-width: 800px)")

  const [isExpanded, setExpanded] = useState(false)

  return <Box cursor={position.url && 'pointer'} onClick={() => position.url && window.open(position.url, '_blank')}
              transition="all .25s ease" _hover={{transform: 'scale(1.02)', filter: "brightness(120%)",}} p={5} m={5}
              bg={'background.secondary'} maxW={'700px'} borderRadius={6}>
    <Flex position={'relative'} w={'100%'}>
      <Avatar
          src={`/${position.image}.png`}
          borderRadius={7}
          name={position.company}
      />
      <Box ml={4} w={'100%'}>
        <Flex flexDirection={isMobile ? 'row' : 'column-reverse'} justifyContent={'space-between'}>
          <Box>
            <Heading>
              {position?.company ?? "Unknown"}
            </Heading>
            <Text opacity={0.7}>
              {position.title}
            </Text>
          </Box>
          <Box mb={1}>
            <Tag right={0} top={0}>
              {position.period}
            </Tag>
          </Box>
        </Flex>

        <Collapse mt={2} startingHeight={44} in={isExpanded}>
          {position?.description ?? ""}
          <UnorderedList>

            {position.items?.map((item, i) => {
              return <ListItem key={i}>
                {item}
              </ListItem>
            })}
          </UnorderedList>
        </Collapse>

        {(position.description?.length > 200 || position.items?.length > 0) &&
            <Tag mt={1} cursor={'pointer'} onClick={(e) => {
              e.stopPropagation()
              setExpanded(!isExpanded)
            }}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </Tag>}
      </Box>
    </Flex>


  </Box>
}
