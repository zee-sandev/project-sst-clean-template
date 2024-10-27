import DynamoDB from './dynamodb.infra'

export default function setupDynamoDB() {
  const options: sst.aws.DynamoArgs = {
    fields: {
      pk: 'string',
      sk: 'string',
      gsi1pk: 'string',
      gsi1sk: 'string',
      gsi2pk: 'string',
      gsi2sk: 'string'
    },
    primaryIndex: {
      hashKey: 'pk',
      rangeKey: 'sk'
    },
    globalIndexes: {
      gsi1: {
        hashKey: 'gsi1pk',
        rangeKey: 'gsi1sk'
      },
      gsi2: {
        hashKey: 'gsi2pk',
        rangeKey: 'gsi2sk'
      }
    }
  }

  const dynamoDB = new DynamoDB('DynamoDB', options)
  return dynamoDB
}
