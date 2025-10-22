'use client'

import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";

export default function ThemeToggle() {
  const {theme, setTheme} = useTheme()

  const isDarkTheme = theme === 'dark'

  return <Button variant={'outline'} className={'fixed bottom-4 right-4'} size={'icon'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {isDarkTheme ? <Moon/> : <Sun/>}
    </Button>
}
