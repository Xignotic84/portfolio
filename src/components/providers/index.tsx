'use client'

import dynamic from "next/dynamic";

const ThemeProvider = dynamic(
  () => import('next-themes').then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
)

import {PropsWithChildren} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


export default function Providers({children}: PropsWithChildren) {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider
      attribute={'class'}
      defaultTheme={'system'}
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}
