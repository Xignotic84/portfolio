import {Avatar, Flex, Heading, Text, Box} from "@chakra-ui/react";
import {useRouter} from "next/navigation";

export default function Song({song}) {
  return <Flex mb={5} cursor={'pointer'} onClick={() => window.open(song.album.external_urls.spotify, '_blank')}>
    <Avatar
      src={song.album.images[0].url}
      name={song.name}
      borderRadius={6}
      alt={song.name}
    />
    <Box ml={2} maxW={'250px'}>
      <Heading size={'md'}>
        {song?.name}
      </Heading>
      <Text opacity={0.7}>
        {song?.album.artists[0].name}
      </Text>
    </Box>
  </Flex>
}
