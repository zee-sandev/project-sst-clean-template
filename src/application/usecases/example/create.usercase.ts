import { IExample } from '@root/core/entities/example.entity'
import { IExampleRepository } from '@root/adapters/repositories/example/example.interface'

@$di.injectable()
export default class CreateExampleUseCase {
  constructor(
    @$di.inject('ExampleRepository')
    private readonly _exampleRepository: IExampleRepository
  ) {}

  async execute(data: IExample): Promise<void> {
    await this._exampleRepository.create(data)
  }
}
