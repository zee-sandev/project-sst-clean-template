'use client'
import { trpc } from '@/utils/trpc.util'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink, loggerLink } from '@trpc/client'
import superjson from 'superjson'

// if (!process.env.NEXT_PUBLIC_TRPC_API_URL) {
//   throw new Error("NEXT_PUBLIC_TRPC_API_URL is not set");
// }

// export const queryClient = new QueryClient();
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: () => process.env.NODE_ENV === 'development'
    }),
    httpBatchLink({
      url: 'https://qyh93ki885.execute-api.us-east-1.amazonaws.com/trpc',
      fetch: async (input, init) => {
        console.log(input, init)
        return fetch(input, init)
      }
    })
  ]
})

export function TRPCProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* <ReactQueryDevtools position='left' /> */}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
