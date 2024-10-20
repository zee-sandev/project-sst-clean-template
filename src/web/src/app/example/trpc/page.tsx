'use client'

import { trpc } from '@/utils/trpc.util'

export default function TRPCPage() {
  const hello = trpc.hello.useQuery({ name: 'world' })

  if (hello.isLoading) return <div>Loading...</div>
  if (hello.error) return <div>Error: {hello.error.message}</div>

  return <div>{hello.data}</div>
}
