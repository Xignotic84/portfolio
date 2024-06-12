'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {theme} from "../../theme/theme";
import { GoogleAnalytics } from '@next/third-parties/google'


export function Providers({ children }) {
  return (
      <CacheProvider>
        <ChakraProvider theme={extendTheme(theme)}>
          {children}
        </ChakraProvider>
        <GoogleAnalytics gaId="G-1HPYCRV7ND" />
      </CacheProvider>
  )
}
