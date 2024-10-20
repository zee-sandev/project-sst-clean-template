import { CognitoUserPoolClient } from '@/.sst/platform/src/components/aws/cognito-user-pool-client'
import { UserPoolConfig } from '../cognito/types/userPool.type'
import WebApp from '../webApp/nextApp.infra'

export type TSetupSSTReturn = {
  WebURL: $util.Output<string>
  WebURN: $util.Output<string>
  userPoolId: $util.Output<string>
  userPoolArn: $util.Output<string>
  userPoolWebClientId: $util.Output<string>
  userPoolWebClientSecret: $util.Output<string>
  userPoolDomain: string
  issuer: string
  cognitoDomain: string
}

export type TCognitoOutput = {
  userPoolInstance: sst.aws.CognitoUserPool
  identityPoolInstance: sst.aws.CognitoIdentityPool
  userPoolWebClient: CognitoUserPoolClient
  userPoolDomain: aws.cognito.UserPoolDomain
  poolId: string
  clientId: string
  clientSecret: string
  poolDomain: string
  cognitoIssuer: string
  authDomain: string
  identityPoolId: string
  userPoolConfig: UserPoolConfig
}

export type TApiOutput = {
  apiInstance: sst.aws.ApiGatewayV2
  apiUrl: string
}

export type TWebAppOutput = {
  NextApp: sst.aws.Nextjs
  WebInstance: WebApp
}
