'use client'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from '@tanstack/react-query'
import { ReactNode } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

export const queryClient = new QueryClient()
const dehydratedState = dehydrate(queryClient)

export function QueryProvider(props: QueryProviderProps) {
  const { children } = props
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}
