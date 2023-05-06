'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {theme} from "../../theme/theme";

export function Providers({ children }) {
  return (
      <CacheProvider>
        <ChakraProvider theme={extendTheme(theme)}>
          {children}
        </ChakraProvider>
      </CacheProvider>
  )
}
