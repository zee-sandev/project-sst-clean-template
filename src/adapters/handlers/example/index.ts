import '@root/core/types/global'
import '@root/src/infrastructure/di/inversify/index'

import CreateExampleUseCase from '@root/src/application/usecases/example/create.usercase'
import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2WithRequestContext
} from 'aws-lambda'
import { Resource } from 'sst'
import { IExampleRepository } from '../../repositories/example/example.interface'

export const handler = async (
  event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>
) => {
  console.log(Resource.Auth.issuer)
  console.log(Resource.Auth.clientId)
  const exampleRepository =
    global.DIContainer.$appContainer.get<IExampleRepository>(
      'ExampleRepository'
    )
  const useCase = new CreateExampleUseCase(exampleRepository)
  await useCase.execute({
    name: 'teste',
    createDate: new Date().toDateString()
  })
  return {
    statusCode: 200,
    body: 'Hello World'
  }
}
