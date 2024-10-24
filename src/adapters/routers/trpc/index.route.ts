// const trpcService = $appContainer.get<TRPCService>(TYPES.TRPCService)

import { helloSchema } from '@root/adapters/validations/example/hello.schema'
import { helloController } from '@root/adapters/controllers/example/hello.controller'
import { privateRouter } from './private.route'

const t = global.DIContainer.$appServices.TRPCService.TrpcInstance

if (!t) {
  throw new Error('TRPCService is not initialized')
}
const mainRouter = t.router({
  hello: t.procedure.input(helloSchema).query(helloController),
  private: privateRouter
})

export const appRouter = t.mergeRouters(mainRouter)

// export type definition of API
export type AppRouter = typeof appRouter
