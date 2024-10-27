import { IExample } from '@root/core/entities/example.entity'

export interface IExampleRepository {
  create(data: IExample): Promise<void>
}
