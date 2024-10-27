import {
  TApiOutput,
  TCognitoOutput,
  TWebAppOutput
} from '@root/infra/types/output.type'
import WebApp from './nextApp.infra'

export default async function initApp(
  cognitoOutput: TCognitoOutput,
  apiOutput: TApiOutput
): Promise<TWebAppOutput> {
  const {
    LOCAL_DOMAIN_FULL,
    LOCAL_PORT,
    PATH,
    PROD_DOMAIN,
    PROD_DOMAIN_CONFIG,
    PROD_PORT
  } = await import('../config/web.config')
  const webInstance = new WebApp()
  webInstance.domainName = $dev ? LOCAL_DOMAIN_FULL : PROD_DOMAIN
  webInstance.domainConfig = PROD_DOMAIN_CONFIG
  webInstance.path = PATH
  webInstance.port = $dev ? LOCAL_PORT : PROD_PORT

  const nextAuthSecret = new sst.Secret(
    'NEXTAUTH_SECRET',
    cognitoOutput.clientSecret
  )
  webInstance.setEnvironment({
    NEXTAUTH_SECRET: nextAuthSecret.value,
    API_URL: apiOutput.apiUrl
  })
  webInstance.addLinkable('AWS', {
    properties: {
      COGNITO_POOL_ID: cognitoOutput.poolId,
      COGNITO_CLIENT_ID: cognitoOutput.clientId,
      COGNITO_CLIENT_SECRET: cognitoOutput.clientSecret,
      COGNITO_ISSUER: cognitoOutput.cognitoIssuer,
      COGNITO_DOMAIN: cognitoOutput.authDomain,
      COGNITO_IDENTITY_POOL_ID: cognitoOutput.identityPoolId,
      OAUTH_CALLBACK_URL:
        cognitoOutput.userPoolConfig.oauthCallbackUrl.join(','),
      OAUTH_LOGOUT_URL: cognitoOutput.userPoolConfig.oauthLogoutUrl.join(','),
      OAUTH_SCOPES: cognitoOutput.userPoolConfig.oauthScopes.join(','),
      OAUTH_FLOWS: cognitoOutput.userPoolConfig.oauthFlows.join(',')
    },
    permissions: []
  })
  const web = webInstance.listen()
  return {
    NextApp: web,
    WebInstance: webInstance
  }
}
