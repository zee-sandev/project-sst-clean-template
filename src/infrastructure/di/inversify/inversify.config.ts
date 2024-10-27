import { Container } from 'inversify'
import { Resource } from 'sst'
import { EntityConfiguration } from 'electrodb'

import TRPCService from '@root/infrastructure/providers/trpc'
import JwtProvider from '@root/infrastructure/providers/jwt/jwt.provider'

import { ElectroConfiguration } from '@root/infrastructure/data/drivers/electrodb.client'
import ExampleEntity from '@root/infrastructure/data/entities/example.entity'
import { IExampleRepository } from '@root/src/adapters/repositories/example/example.interface'
import ExampleRepository from '../../data/repositories/example/example.repo'

// Define some types
const TYPES = {
  ElectroConfig: Symbol.for('ElectroConfig'),
  IExampleRepository: Symbol.for('IExampleRepository')
}

const container = new Container()
// Bind the TRPCService as a singleton
container.bind<string>('Issuer').toConstantValue(Resource.Auth.issuer)
container.bind<TRPCService>(TRPCService).toSelf().inSingletonScope()
container.bind<JwtProvider>(JwtProvider).toSelf().inSingletonScope()

// Data
container
  .bind<EntityConfiguration>('ElectroConfig')
  .toConstantValue(ElectroConfiguration)
container.bind<ExampleEntity>(ExampleEntity).toSelf().inSingletonScope()

//Repositories
container
  .bind<IExampleRepository>('ExampleRepository')
  .to(ExampleRepository)
  .inSingletonScope()

export { container }
