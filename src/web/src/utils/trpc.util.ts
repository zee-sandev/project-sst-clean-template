import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@root/adapters/routers/trpc/index.route' // Import your AppRouter type

export const trpc = createTRPCReact<AppRouter>()
