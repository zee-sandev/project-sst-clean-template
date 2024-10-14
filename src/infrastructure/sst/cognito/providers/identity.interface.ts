export default abstract class UserPoolIdentityProvider {
  protected _providerArgs!: sst.aws.CognitoIdentityProviderArgs
  protected _providerName!: string
  protected _userPool!: sst.aws.CognitoUserPool

  constructor(
    clientId: $util.Output<string>,
    clientSecret: $util.Output<string>
  )

  constructor(
    clientId?: $util.Output<string>,
    clientSecret?: $util.Output<string>
  ) {
    this._providerArgs = {
      // default amazon provider
      type: 'amazon',
      details: {
        client_id: clientId ?? '',
        client_secret: clientSecret ?? ''
      },
      attributes: {
        email: 'email',
        name: 'name',
        username: 'sub'
      }
    }
  }

  public get userPool(): sst.aws.CognitoUserPool {
    return this._userPool
  }

  public set userPool(userPool: sst.aws.CognitoUserPool) {
    this._userPool = userPool
  }

  public get providerName(): string {
    return this._providerName
  }

  public addProvider(): void {
    this._userPool.addIdentityProvider(this._providerName, this._providerArgs)
  }
}
