/** @type {import('next').NextConfig} */
import { Resource } from 'sst'
const nextConfig = {
  env: {
    COGNITO_POOL_ID: Resource.AWS.COGNITO_POOL_ID,
    COGNITO_CLIENT_ID: Resource.AWS.COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET: Resource.AWS.COGNITO_CLIENT_SECRET,
    COGNITO_ISSUER: Resource.AWS.COGNITO_ISSUER,
    COGNITO_DOMAIN: Resource.AWS.COGNITO_DOMAIN,
    COGNITO_IDENTITY_POOL_ID: Resource.AWS.COGNITO_IDENTITY_POOL_ID,
    domain: process.env.NEXTAUTH_URL,
    sst_domain: process.env.domain,
    OAUTH_CALLBACK_URL: Resource.AWS.OAUTH_CALLBACK_URL,
    OAUTH_LOGOUT_URL: Resource.AWS.OAUTH_LOGOUT_URL,
    OAUTH_SCOPES: Resource.AWS.OAUTH_SCOPES,
    OAUTH_FLOWS: Resource.AWS.OAUTH_FLOWS
  }
}

export default nextConfig
