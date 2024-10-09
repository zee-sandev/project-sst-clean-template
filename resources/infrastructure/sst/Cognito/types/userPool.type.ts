export type UserPoolConfig = {
  userPoolDomainName: string
  oauthCallbackUrl: string[]
  oauthLogoutUrl: string[]
  oauthScopes: string[]
  oauthFlows: string[]
}
