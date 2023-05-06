import {useState} from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag
} from "@chakra-ui/react";
import Song from "./Song";
import {useQuery} from "react-query";
import Artist from "./Artist";

export default  function TopSpotifyBlock() {
  const {data, isLoading, isError} = useQuery('spotifySongs', () => {
    return fetch('/api/spotify').then(r => r.json())
  })
  const [showSongs, setShowSongs] = useState()

  return  <Box>
    <Box alignItems={'center'} mt={5} gap={5} w={'100%'}>
      <Tabs variant='soft-rounded' w={'100%'}>
        <Flex justifyContent={'space-between'} alignItems={'center'} gap={20}>
          <Heading ml={2} size={'lg'}>
            My Top Music
          </Heading>
          <TabList>
            <Tab borderRadius={6}>Songs</Tab>
            <Tab ml={4} borderRadius={6}>Artists</Tab>
          </TabList>
        </Flex>

        <TabPanels>
          {isLoading && <Center mt={300}>
            <Spinner size={'lg'}/>
          </Center>}
          {isError && <Center mt={300}>
            <Tag colorScheme={'red'}>
              Something went wrong...
            </Tag>
          </Center>}
          <TabPanel w={'100%'}>
            {data?.tracks?.items?.map((s, i) => {
              return <Song key={i} song={s}/>
            })}
          </TabPanel>
          <TabPanel w={'100%'}>
            {data?.artists?.items?.map((s, i) => {
              return <Artist key={i} artist={s}/>
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Box>
}
