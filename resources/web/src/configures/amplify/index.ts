'use client'
import { type ResourcesConfig } from 'aws-amplify'
import { isString } from 'lodash'

const amplifyConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: String(process.env.COGNITO_POOL_ID),
    userPoolClientId: String(process.env.COGNITO_CLIENT_ID),
    identityPoolId: String(process.env.COGNITO_IDENTITY_POOL_ID),
    signUpVerificationMethod: 'code',
    loginWith: {
      oauth: {
        domain: String(process.env.COGNITO_DOMAIN),
        scopes: isString(process.env.OAUTH_SCOPES)
          ? process.env.OAUTH_SCOPES.split(',')
          : ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: isString(process.env.OAUTH_CALLBACK_URL)
          ? process.env.OAUTH_CALLBACK_URL.split(',')
          : ['https://localhost:3000'],
        redirectSignOut: isString(process.env.OAUTH_LOGOUT_URL)
          ? process.env.OAUTH_LOGOUT_URL.split(',')
          : ['https://localhost:3000'],
        responseType: 'code'
      }
    }
  }
}

export { amplifyConfig }
