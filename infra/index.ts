import { TSetupSSTReturn } from './types/output.type'
import initDynamoDB from './database/dynamodb'
import initCognito from './cognito'
import initApp from './webApp'
import initApiGateway from './apiGateway'

export default async function setupSST(): Promise<TSetupSSTReturn> {
  const region = await asyncGetUtilOutput(aws.getRegionOutput().name)

  const dynamoDB = await initDynamoDB()
  const databaseLinkable = dynamoDB.instance

  const cognitoOutput = await initCognito(region)
  const apiOutput = await initApiGateway(
    cognitoOutput.cognitoIssuer,
    cognitoOutput.clientId,
    databaseLinkable
  )
  const webAppOutput = await initApp(cognitoOutput, apiOutput)
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
