export default class IdentityPool {
  protected _userPool: sst.aws.CognitoUserPool
  protected _clientId: $util.Output<string>

  constructor(
    userPool: sst.aws.CognitoUserPool,
    clientId: $util.Output<string>
  ) {
    this._userPool = userPool
    this._clientId = clientId
  }

  public async createIdentityPool(): Promise<sst.aws.CognitoIdentityPool> {
    let userPoolId: string = await asyncGetUtilOutput(this._userPool.id),
      clientId: string = await asyncGetUtilOutput(this._clientId)

    return new sst.aws.CognitoIdentityPool('identityPool', {
      userPools: [
        {
          userPool: userPoolId,
          client: clientId
        }
      ]
    })
  }
}
