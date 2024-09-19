import IdentityPool from './identityPool.infra'

const { userPool, userPoolWebClient } = await import(
  '@Resources/Infrastructure/sst/Cognito/userPool.infra'
)

const identityPool = new IdentityPool(userPool, userPoolWebClient.id)
const cognitoIdentityPool = await identityPool.createIdentityPool()
export { userPool, userPoolWebClient, cognitoIdentityPool }
