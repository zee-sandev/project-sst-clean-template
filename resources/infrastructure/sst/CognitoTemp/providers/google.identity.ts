import UserPoolIdentityProvider from './identity.interface'

export default class GoogleIdentityProvider extends UserPoolIdentityProvider {
  constructor(
    clientId: $util.Output<string>,
    clientSecret: $util.Output<string>
  ) {
    super(clientId, clientSecret)
    this._providerName = 'Google'
    this._providerArgs = {
      type: 'google',
      details: {
        authorize_scopes: 'profile email',
        client_id: clientId,
        client_secret: clientSecret
      },
      attributes: {
        email: 'email',
        name: 'name',
        username: 'sub',
        profile: 'profile'
      }
    }
  }
}
