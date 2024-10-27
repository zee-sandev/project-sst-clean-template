import Linkable from '@root/infra/interfaces/linkable/linkable.abstract'

class DynamoDB extends Linkable {
  private _dynamo: sst.aws.Dynamo

  constructor(name: string, options: sst.aws.DynamoArgs) {
    super()
    this._dynamo = new sst.aws.Dynamo(name, options)
  }

  public subscribe(
    subscriber: string | sst.aws.FunctionArgs | sst.aws.FunctionArn,
    args?: sst.aws.DynamoSubscriberArgs
  ) {
    this._dynamo.subscribe(subscriber, args)
  }

  public get instance() {
    return this._dynamo
  }

  public get name() {
    return this._dynamo.name
  }
}

export default DynamoDB
