export default class IdentityPool {
  protected _userPool: sst.aws.CognitoUserPool
  protected _clientId: $util.Output<string>
  private _identityPool!: sst.aws.CognitoIdentityPool
  constructor(
    userPool: sst.aws.CognitoUserPool,
    clientId: $util.Output<string>
  ) {
    this._userPool = userPool
    this._clientId = clientId
  }

  public get identityPool(): sst.aws.CognitoIdentityPool {
    return this._identityPool
  }

  public async createIdentityPool(): Promise<sst.aws.CognitoIdentityPool> {
    try {
      let userPoolId: string = await asyncGetUtilOutput(this._userPool.id)
      let clientId: string = await asyncGetUtilOutput(this._clientId)

      this._identityPool = new sst.aws.CognitoIdentityPool('identityPool', {
        userPools: [
          {
            userPool: userPoolId,
            client: clientId
          }
        ]
      })
      return this._identityPool
    } catch (error) {
      console.error('Error creating Identity Pool:', error)
      throw error
    }
  }
}
