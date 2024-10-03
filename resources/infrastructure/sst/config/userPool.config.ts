import { LOCAL_DOMAIN_FULL, PROD_DOMAIN } from './web.config'

// Define the URLs for the user pool
const LOCAL_CALLBACK_URLS = [`https://${LOCAL_DOMAIN_FULL}/`]
const LOCAL_LOGOUT_URLS = [`https://${LOCAL_DOMAIN_FULL}/logout`]

const PROD_CALLBACK_URLS = [`https://${PROD_DOMAIN}/`]
const PROD_LOGOUT_URLS = [`https://${PROD_DOMAIN}/logout`]

// Define resources names
const USER_POOL_NAME = 'userPool'
const USER_POOL_CLIENT_NAME = 'webClient'
const USER_POOL_DOMAIN_NAME = 'userPoolDomain'

/*
code: Authorization code flow (valid for server-side applications).
implicit: Implicit flow (valid for single-page applications).
client_credentials: Client credentials flow (for server-to-server communication).
*/
const ALLOWED_OAUTH_FLOWS = ['code']
const ALLOWED_OAUTH_SCOPES = ['email', 'openid', 'profile']

const USER_POOL_DOMAIN = `${$app.stage}-${$app.name}`

// Export the values
export {
  LOCAL_CALLBACK_URLS,
  LOCAL_LOGOUT_URLS,
  PROD_CALLBACK_URLS,
  PROD_LOGOUT_URLS,
  USER_POOL_NAME,
  USER_POOL_CLIENT_NAME,
  USER_POOL_DOMAIN_NAME,
  ALLOWED_OAUTH_FLOWS,
  ALLOWED_OAUTH_SCOPES,
  USER_POOL_DOMAIN
}
