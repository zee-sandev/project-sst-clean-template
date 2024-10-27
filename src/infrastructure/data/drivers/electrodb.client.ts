import { EntityConfiguration } from 'electrodb'
import dynamo from './dynamodb.client'
import { Resource } from 'sst'

export const ElectroConfiguration: EntityConfiguration = {
  table: Resource.DynamoDB.name,
  client: dynamo
} as EntityConfiguration
