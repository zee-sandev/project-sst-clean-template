import setupCognito from './cognito/cognito.infra'
import WebApp from './webApp/nextApp.infra'
import setupApiGateway from './apiGateway/index'
import setupDynamoDB from './database/dynamodb'
import {
  TCognitoOutput,
  TWebAppOutput,
  TSetupSSTReturn,
  TApiOutput
} from './types/output.type'

async function outputCognito(region: string): Promise<TCognitoOutput> {
  const {
    userPoolInstance,
    userPoolWebClient,
    cognitoIdentityPool,
    userPoolDomain,
    userPoolConfig
  } = await setupCognito(region)
  const [poolId, clientId, clientSecret, poolDomain, identityPoolId] =
    await asyncAllGetUtilOutput<string>([
      userPoolInstance.id,
      userPoolWebClient.id,
      userPoolWebClient.secret,
      userPoolDomain.domain,
      cognitoIdentityPool.id
    ])

  const cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${poolId}`
  const authDomain = `${poolDomain}.auth.${region}.amazoncognito.com`

  return {
    userPoolInstance,
    identityPoolInstance: cognitoIdentityPool,
    userPoolWebClient,
    userPoolDomain,
    poolId,
    clientId,
    clientSecret,
    poolDomain,
    cognitoIssuer,
    authDomain,
    identityPoolId,
    userPoolConfig
  }
}

async function outputWebApp(
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
  } = await import('./config/web.config')
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

async function outputApi(
  issuer: string,
  clientId: string
): Promise<TApiOutput> {
  const api = await setupApiGateway(issuer, clientId)
  const apiInstance = api.apiInstance
  const apiUrl = await asyncGetUtilOutput(apiInstance.url)
  return {
    apiInstance: api.apiInstance,
    apiUrl
  }
}

export default async function setupSST(): Promise<TSetupSSTReturn> {
  const region = await asyncGetUtilOutput(aws.getRegionOutput().name)

  const dynamoDB = await setupDynamoDB()
  const cognitoOutput = await outputCognito(region)
  const apiOutput = await outputApi(
    cognitoOutput.cognitoIssuer,
    cognitoOutput.clientId
  )
  const webAppOutput = await outputWebApp(cognitoOutput, apiOutput)
  return {
    WebURL: webAppOutput.NextApp.url,
    WebURN: webAppOutput.NextApp.urn,
    userPoolId: cognitoOutput.userPoolInstance.id,
    userPoolArn: cognitoOutput.userPoolInstance.arn,
    userPoolWebClientId: cognitoOutput.userPoolWebClient.id,
    userPoolWebClientSecret: cognitoOutput.userPoolWebClient.secret,
    userPoolDomain: cognitoOutput.poolDomain,
    issuer: cognitoOutput.cognitoIssuer,
    cognitoDomain: cognitoOutput.authDomain,
    database: dynamoDB.instance.name
  }
}
