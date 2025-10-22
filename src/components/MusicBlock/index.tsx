'use client'
import {Tabs, TabsList, TabsPanel, TabsTab} from "@/components/ui/tabs"
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {MusicBlockEmptyState} from "@/components/MusicBlock/MusicBlockEmptyState";
import MusicEntity from "@/components/MusicBlock/MusicCard";


export default function MusicBlock() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['spotify'],
    retry: 2,
    queryFn: async () => {
      const r = await axios.get('/api/spotify');
      return r.data;
    }
  })

  const artists = data?.artists?.items
  const tracks = data?.tracks?.items

  return (
    <div className="row-span-2">
      <Tabs defaultValue="tab-1">
        <TabsList className={'w-full'}>
          <TabsTab value="tab-1">Songs</TabsTab>
          <TabsTab value="tab-2">Artists</TabsTab>
        </TabsList>
        {(isLoading || isError) && <MusicBlockEmptyState isError={isError}/>}
        <TabsPanel value="tab-1">
          {tracks?.map((track: any) => {
            return <MusicEntity
              url={track.external_urls.spotify}
              key={track.name}
              title={track.name}
              subTitle={track?.album.artists[0].name}
              avatar={track.album.images[0].url}/>
          })}
        </TabsPanel>
        <TabsPanel value="tab-2">
          {artists?.map((artist: any) => {
            return <MusicEntity
              url={artist.external_urls.spotify}
              key={artist.name}
              title={artist.name}
              subTitle={artist.genres[0]}
              avatar={artist.images[0].url}/>
          })}
        </TabsPanel>
      </Tabs>
    </div>
  )
}
