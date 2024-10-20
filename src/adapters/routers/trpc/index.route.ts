// const trpcService = $appContainer.get<TRPCService>(TYPES.TRPCService)

import { helloSchema } from '@root/adapters/validations/example/hello.schema'
import { helloController } from '@root/adapters/controllers/example/hello.controller'

const t = global.DIContainer.$appServices.TRPCService.TrpcInstance

if (!t) {
  throw new Error('TRPCService is not initialized')
}

export const appRouter = t.router({
  hello: t.procedure.input(helloSchema).query(helloController)
})

// export type definition of API
export type AppRouter = typeof appRouter
