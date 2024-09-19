export default abstract class UserPoolIdentityProvider {
  protected _providerArgs!: sst.aws.CognitoIdentityProviderArgs
  protected _providerName!: string
  protected _userPool!: sst.aws.CognitoUserPool

  constructor(userPool: sst.aws.CognitoUserPool)
  constructor(
    userPool: sst.aws.CognitoUserPool,
    clientId: $util.Output<string>,
    clientSecret: $util.Output<string>
  )

  constructor(
    userPool: sst.aws.CognitoUserPool,
    clientId?: $util.Output<string>,
    clientSecret?: $util.Output<string>
  ) {
    this._userPool = userPool
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

  public addProvider(): void {
    this._userPool.addIdentityProvider(this._providerName, this._providerArgs)
  }
}
