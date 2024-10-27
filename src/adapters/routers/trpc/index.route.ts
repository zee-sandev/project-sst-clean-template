import { privateRouter } from './private.route'
import { publicRouter } from './public.router'

const t = global.DIContainer.$appServices.TRPCService.TrpcInstance

if (!t) {
  throw new Error('TRPCService is not initialized')
}
const mainRouter = t.router({
  public: publicRouter,
  private: privateRouter
})

export const appRouter = t.mergeRouters(mainRouter)

// export type definition of API
export type AppRouter = typeof appRouter
