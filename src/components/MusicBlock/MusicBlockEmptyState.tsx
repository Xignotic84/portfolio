import {CircleAlertIcon, RefreshCcwIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,} from "@/components/ui/empty"
import {Spinner} from "@/components/ui/spinner";
import {useQueryClient} from "@tanstack/react-query";

export function MusicBlockEmptyState({isError}: { isError: boolean }) {
  const display = isError ? {
    title: 'An error occurred',
    icon: <CircleAlertIcon/>,
    description: 'Uh oh, something went wrong...'
  } : {
    title: 'Loading',
    description: 'Fetching tracks and artists...',
    icon: <Spinner/>
  }

  const queryClient = useQueryClient()

  return (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {display.icon}
        </EmptyMedia>
        <EmptyTitle>{display.title}</EmptyTitle>
        <EmptyDescription>
          {display.description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {isError && <Button onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ['spotify']
          })
        }} variant="outline" size="sm">
          <RefreshCcwIcon/>
          Refresh
        </Button>}
      </EmptyContent>
    </Empty>
  )
}
