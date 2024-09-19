import GoogleIdentityProvider from './providers/google.identity'
import UserPoolIdentityProvider from './providers/identity.interface'

const userPool: sst.aws.CognitoUserPool = new sst.aws.CognitoUserPool(
  'userPool',
  {
    usernames: ['email']
  }
)
const googleClientId = new sst.Secret('GoogleClientId').value
const googleClientSecret = new sst.Secret('GoogleClientSecret').value
const googleIdP: UserPoolIdentityProvider = new GoogleIdentityProvider(
  userPool,
  googleClientId,
  googleClientSecret
)
googleIdP.addProvider()

export { userPool }
