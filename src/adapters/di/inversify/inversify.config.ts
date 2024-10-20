// src/inversify.config.ts
import { Container } from 'inversify'
import TRPCService from '@root/adapters/trpc'

// Define some types
const TYPES = {
  TRPCService: Symbol.for('TRPCService')
}

const container = new Container()
// Bind the TRPCService as a singleton
container.bind<TRPCService>(TRPCService).toSelf().inSingletonScope()
export { container }
