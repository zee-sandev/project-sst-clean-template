'use client'
import { type ResourcesConfig } from 'aws-amplify'

const amplifyConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: String(process.env.COGNITO_POOL_ID),
    userPoolClientId: String(process.env.COGNITO_CLIENT_ID)
  }
}

export { amplifyConfig }
