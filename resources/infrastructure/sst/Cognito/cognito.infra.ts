import IdentityPool from './identityPool.infra'
import UserPool from './userPool.infra'
import GoogleIdentityProvider from './providers/google.identity'
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'

//#region Import Config
import UserPoolIdentityProvider from './providers/identity.interface'
//#endregion

async function getGoogleIdentityProvider(): Promise<UserPoolIdentityProvider> {
  const googleClientId = new sst.Secret('GoogleClientId').value
  const googleClientSecret = new sst.Secret('GoogleClientSecret').value
  const googleIdentityProvider = new GoogleIdentityProvider(
    googleClientId,
    googleClientSecret
  )
  return googleIdentityProvider
}

async function setupUserPool(region: string): Promise<UserPool> {
  const {
    LOCAL_CALLBACK_URLS,
    LOCAL_LOGOUT_URLS,
    USER_POOL_NAME,
    USER_POOL_CLIENT_NAME,
    USER_POOL_DOMAIN_NAME,
    ALLOWED_OAUTH_FLOWS,
    ALLOWED_OAUTH_SCOPES,
    USER_POOL_DOMAIN,
    PROD_CALLBACK_URLS,
    PROD_LOGOUT_URLS
  } = await import('../config/userPool.config')
  // AWS SDK configuration
  const cognito = new CognitoIdentityProviderClient({ region })

  const userPool = new UserPool()
  userPool.cognitoClient = cognito

  //#region Set UserPool Resource Name
  userPool.resourceName = {
    userPool: USER_POOL_NAME,
    userPoolClient: USER_POOL_CLIENT_NAME,
    userPoolDomain: USER_POOL_DOMAIN_NAME
  }
  //#endregion

  //#region Configure UserPool
  userPool.userPoolDomainName = USER_POOL_DOMAIN
  userPool.oauthCallbackUrl = $dev ? LOCAL_CALLBACK_URLS : PROD_CALLBACK_URLS
  userPool.oauthLogoutUrl = $dev ? LOCAL_LOGOUT_URLS : PROD_LOGOUT_URLS
  userPool.oauthScopes = ALLOWED_OAUTH_SCOPES
  userPool.oauthFlows = ALLOWED_OAUTH_FLOWS
  //#endregion

  await userPool.createUserPool()
  await userPool.createDomain()

  //#region Google Identity Provider
  const googleIdentityProvider = await getGoogleIdentityProvider()
  userPool.addIdentityProvider(googleIdentityProvider)

  // Create UserPoolClient after setting Identity Provider
  await userPool.createClient()
  //#endregion
  return userPool
}

async function setupIdentityPool(
  userPool: UserPool
): Promise<sst.aws.CognitoIdentityPool> {
  const identityPool = new IdentityPool(
    userPool.userPool,
    userPool.userPoolClient.id
  )
  const cognitoIdentityPool = await identityPool.createIdentityPool()
  return cognitoIdentityPool
}

export default async function setupCognito(region: string) {
  const userPool = await setupUserPool(region)
  const cognitoIdentityPool = await setupIdentityPool(userPool)

  const userPoolInstance = userPool.userPool
  const userPoolWebClient = userPool.userPoolClient
  const userPoolDomain = userPool.userPoolDomain

  return {
    userPoolInstance,
    userPoolWebClient,
    cognitoIdentityPool,
    userPoolDomain
  }
}

// const region = await asyncGetUtilOutput(aws.getRegionOutput().name)
// const {
//   userPoolInstance,
//   userPoolWebClient,
//   cognitoIdentityPool,
//   userPoolDomain
// } = await setupCognito(region)

// export {
//   userPoolInstance,
//   userPoolWebClient,
//   cognitoIdentityPool,
//   userPoolDomain
// }
