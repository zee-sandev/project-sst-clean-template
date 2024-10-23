import { injectable } from 'inversify'
import { initTRPC } from '@trpc/server' // Adjust the path as necessary
import type { Context } from './context'
@injectable()
export default class TRPCService {
  private trpcInstance: ReturnType<typeof initTRPC.create> | undefined

  constructor() {
    this.initializeTRPC()
  }

  private initializeTRPC() {
    if (!this.trpcInstance) {
      this.trpcInstance = initTRPC.create<Context>()
    }
  }

  public get TrpcInstance() {
    return this.trpcInstance
  }
}
