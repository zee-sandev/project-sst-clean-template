import { IExampleRepository } from '@root/adapters/repositories/example/example.interface'
import { IExample } from '@root/core/entities/example.entity'
import ExampleEntity from '@root/infrastructure/data/entities/example.entity'

@$di.injectable()
export default class ExampleRepository implements IExampleRepository {
  constructor(
    @$di.inject(ExampleEntity) private readonly _exampleEntity: ExampleEntity
  ) {}
  async create(data: IExample): Promise<void> {
    const result = await this._exampleEntity.entity.create(data).go()
    console.log(result)
  }
}
