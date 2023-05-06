import {Avatar, Flex, Heading, Text, Box} from "@chakra-ui/react";
import {useRouter} from "next/navigation";

export default function Artist({artist}) {
  return <Flex mb={5} cursor={'pointer'} onClick={() => window.open(artist.external_urls.spotify, '_blank')}>
    <Avatar
        src={artist.images[0].url}
        name={artist.name}
        borderRadius={6}
        alt={artist.name}
    />
    <Box ml={2}>
      <Heading size={'md'}>
        {artist?.name}
      </Heading>
      <Text opacity={0.7}>
        {artist.genres[0] || "unknown"}
      </Text>
    </Box>
  </Flex>
}
