'use client'

import {Providers} from "./providers";
import {Box} from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './../../theme/style.css';

export default function RootLayout({children}) {
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body>
        <Providers>
          <QueryClientProvider client={queryClient}>

          <Box m={'0 auto'} maxW={'72rem'}>
            {children}
          </Box>
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  )
}
