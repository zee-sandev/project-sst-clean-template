import { TCognitoOutput } from '@root/infra/types/output.type'
import setupCognito from './cognito.infra'

export default async function initCognito(
  region: string
): Promise<TCognitoOutput> {
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
