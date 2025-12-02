import CoreAvatar from "@/components/CoreAvatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface MusicEntryProps {
  title: string
  subTitle: string
  url: string
  avatar?: string
}

export default function MusicEntity({title, subTitle, url, avatar}: MusicEntryProps) {
  return (
    <Button variant={'ghost'} render={<Link href={url} target={'_blank'}/>} className={'w-full justify-start align-center'}>
      <CoreAvatar
        className={'rounded-md size-12'}
        src={avatar}
        name={title}
      />
      <div className={'flex-row align-start w-85'}>
        <h3 className={'justify-start truncate text-lg line-clamp-1"'}>{title}</h3>
        <p className={'justify-start text-muted-foreground'}>{subTitle}</p>
      </div>
    </Button>
  )
}
