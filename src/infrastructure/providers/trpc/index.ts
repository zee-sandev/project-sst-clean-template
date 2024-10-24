import { injectable } from 'inversify'
import { initTRPC } from '@trpc/server' // Adjust the path as necessary
import type { Context } from './context'

type TRPCBuilder = ReturnType<typeof initTRPC.context<Context>>
type TRPCInstance = ReturnType<TRPCBuilder['create']>

@injectable()
export default class TRPCService {
  private trpcInstance: Awaited<TRPCInstance> | undefined

  constructor() {
    this.initializeTRPC()
  }

  private initializeTRPC() {
    if (!this.trpcInstance) {
      this.trpcInstance = initTRPC.context<Context>().create()

      console.log(typeof this.trpcInstance)
    }
  }

  public get TrpcInstance() {
    return this.trpcInstance
  }
}
