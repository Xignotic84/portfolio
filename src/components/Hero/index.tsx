import {Button} from "@/components/ui/button";
import {Github} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className={'flex justify-between align-center'}>
      <div className={'flex-row space-y-4'}>
        <h1 className={'text-6xl font-bold'}>Hey, I am Xignotic!</h1>
        <p className={'text-lg text-muted-foreground'}>I am a Full Stack Engineer based in Amsterdam, Netherlands.
          Currently working at <b>Booking.com</b></p>
      </div>
      <div className={'flex gap-4 align-center'}>
        <Button size={'icon-lg'} variant={'ghost'}
                render={<Link href={'https://github.com/Xignotic84'} target={'_blank'}/>}>
          <Github/>
        </Button>
      </div>
    </div>
  )
}
