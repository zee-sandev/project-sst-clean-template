import GoogleIdentityProvider from './providers/google.identity'
import UserPoolIdentityProvider from './providers/identity.interface'

const USER_POOL_NAME = 'userPool'
const CLIENT_NAME = 'webClient'

// Define the URLs for the user pool
const CALLBACK_URLS = ['http://localhost:3000/callback']
const LOGOUT_URLS = ['http://localhost:3000/logout']

/*
code: Authorization code flow (valid for server-side applications).
implicit: Implicit flow (valid for single-page applications).
client_credentials: Client credentials flow (for server-to-server communication).
*/
const ALLOWED_OAUTH_FLOWS = ['code', 'implicit']
const ALLOWED_OAUTH_SCOPES = ['email', 'openid', 'profile']

const userPool: sst.aws.CognitoUserPool = new sst.aws.CognitoUserPool(
  USER_POOL_NAME,
  {
    usernames: ['email']
  }
)
const googleClientId = new sst.Secret('GoogleClientId').value
const googleClientSecret = new sst.Secret('GoogleClientSecret').value
const googleIdP: UserPoolIdentityProvider = new GoogleIdentityProvider(
  userPool,
  googleClientId,
  googleClientSecret
)
googleIdP.addProvider()

const userPoolWebClient = userPool.addClient(CLIENT_NAME, {
  transform: {
    client: {
      generateSecret: true,
      allowedOauthFlows: ALLOWED_OAUTH_FLOWS,
      allowedOauthScopes: ALLOWED_OAUTH_SCOPES,
      callbackUrls: CALLBACK_URLS,
      logoutUrls: LOGOUT_URLS
      // supportedIdentityProviders: ['COGNITO','GOOGLE']
    }
  }
})

export { userPool, userPoolWebClient }
