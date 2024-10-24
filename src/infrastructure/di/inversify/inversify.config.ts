// src/inversify.config.ts
import { Container } from 'inversify'
import TRPCService from '@root/infrastructure/providers/trpc'
import JwtProvider from '@root/infrastructure/providers/jwt/jwt.provider'
import { Resource } from 'sst'
// Define some types
const TYPES = {
  TRPCService: Symbol.for('TRPCService'),
  JwtProvider: Symbol.for('JwtProvider')
}

const container = new Container()
// Bind the TRPCService as a singleton
container.bind<string>('Issuer').toConstantValue(Resource.Auth.issuer)
container.bind<TRPCService>(TRPCService).toSelf().inSingletonScope()
container.bind<JwtProvider>(JwtProvider).toSelf().inSingletonScope()

export { container }
