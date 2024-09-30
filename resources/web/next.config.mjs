/** @type {import('next').NextConfig} */
import { Resource } from 'sst'
const nextConfig = {
  env: {
    COGNITO_POOL_ID: Resource.AWS.COGNITO_POOL_ID,
    COGNITO_CLIENT_ID: Resource.AWS.COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET: Resource.AWS.COGNITO_CLIENT_SECRET,
    COGNITO_ISSUER: Resource.AWS.COGNITO_ISSUER,
    COGNITO_DOMAIN: Resource.AWS.COGNITO_DOMAIN,
    domain: process.env.NEXTAUTH_URL,
    sst_domain: process.env.domain
  }
}

export default nextConfig
