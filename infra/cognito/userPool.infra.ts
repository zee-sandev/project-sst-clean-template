import UserPoolIdentityProvider from './providers/identity.interface'
import {
  CognitoIdentityProviderClient,
  DescribeUserPoolDomainCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { CognitoUserPoolClient } from '@root/.sst/platform/src/components/aws/cognito-user-pool-client'

export default class UserPool {
  private _userPool!: sst.aws.CognitoUserPool
  private _userPoolClient!: CognitoUserPoolClient
  private _identityProviders: UserPoolIdentityProvider[] = []
  private _userPoolDomain!: aws.cognito.UserPoolDomain

  private _isDomainExists: boolean = false
  private _cognitoClient: CognitoIdentityProviderClient | undefined

  //#region Configuration
  private _resourceName: {
    userPool: string
    userPoolClient: string
    userPoolDomain: string
  } = {
    userPool: 'userPool',
    userPoolClient: 'userPoolClient',
    userPoolDomain: 'userPoolDomain'
  }
  private _userPoolDomainName: string | undefined
  private _oauthCallbackUrl: string[] | undefined
  private _oauthLogoutUrl: string[] | undefined
  private _oauthScopes: string[] | undefined
  private _oauthFlows: string[] | undefined
  //#endregion

  constructor() {}

  //#region Getters Setters
  public get userPool(): sst.aws.CognitoUserPool {
    return this._userPool
  }

  public get userPoolClient(): CognitoUserPoolClient {
    return this._userPoolClient
  }

  public get userPoolDomain(): aws.cognito.UserPoolDomain {
    return this._userPoolDomain
  }

  public get isDomainExists(): boolean {
    return this._isDomainExists
  }

  public set cognitoClient(cognitoClient: CognitoIdentityProviderClient) {
    this._cognitoClient = cognitoClient
  }

  public set resourceName(resourceName: {
    userPool: string
    userPoolClient: string
    userPoolDomain: string
  }) {
    this._resourceName = resourceName
  }

  public get userPoolDomainName(): string | undefined {
    return this._userPoolDomainName
  }

  public get oauthCallbackUrl(): string[] | undefined {
    return this._oauthCallbackUrl
  }

  public get oauthLogoutUrl(): string[] | undefined {
    return this._oauthLogoutUrl
  }

  public get oauthScopes(): string[] | undefined {
    return this._oauthScopes
  }

  public get oauthFlows(): string[] | undefined {
    return this._oauthFlows
  }

  public set userPoolDomainName(userPoolDomainName: string) {
    this._userPoolDomainName = userPoolDomainName
  }

  public set oauthCallbackUrl(oauthCallbackUrl: string[]) {
    this._oauthCallbackUrl = oauthCallbackUrl
  }

  public set oauthLogoutUrl(oauthLogoutUrl: string[]) {
    this._oauthLogoutUrl = oauthLogoutUrl
  }

  public set oauthScopes(oauthScopes: string[]) {
    this._oauthScopes = oauthScopes
  }

  public set oauthFlows(oauthFlows: string[]) {
    this._oauthFlows = oauthFlows
  }
  //#endregion

  public async createUserPool(): Promise<sst.aws.CognitoUserPool> {
    try {
      this._userPool = new sst.aws.CognitoUserPool(
        this._resourceName.userPool,
        {
          usernames: ['email']
        }
      )
      return this._userPool
    } catch (error) {
      console.error('Error creating User Pool:', error)
      throw error
    }
  }

  public async createDomain(): Promise<aws.cognito.UserPoolDomain> {
    try {
      if (!this._userPoolDomainName) {
        throw new Error('User Pool Domain Name is not initialized')
      }
      this._userPoolDomain = new aws.cognito.UserPoolDomain(
        this._resourceName.userPoolDomain,
        {
          domain: this._userPoolDomainName,
          userPoolId: this._userPool.id
        }
      )
      return this._userPoolDomain
    } catch (error) {
      console.error('Error creating User Pool Domain:', error)
      throw error
    }
  }

  public async createClient(): Promise<CognitoUserPoolClient> {
    try {
      const supportedIdentityProviders = this._identityProviders.map(
        (provider) => provider.providerName
      )
      this._userPoolClient = this._userPool.addClient(
        this._resourceName.userPoolClient,
        {
          transform: {
            client: {
              generateSecret: false,
              allowedOauthFlows: this._oauthFlows,
              allowedOauthScopes: this._oauthScopes,
              callbackUrls: this._oauthCallbackUrl,
              logoutUrls: this._oauthLogoutUrl,
              allowedOauthFlowsUserPoolClient: true,
              supportedIdentityProviders: [
                'COGNITO',
                ...supportedIdentityProviders
              ]
            }
          }
        }
      )
      return this._userPoolClient
    } catch (error) {
      console.error('Error creating User Pool Client:', error)
      throw error
    }
  }

  public addIdentityProvider(provider: UserPoolIdentityProvider): void {
    provider.userPool = this._userPool
    provider.addProvider()
    this._identityProviders.push(provider)
  }

  private async checkDomainExists(): Promise<boolean> {
    try {
      if (!this._cognitoClient) {
        throw new Error('Cognito Client is not initialized')
      }

      if (!this._userPoolDomainName) {
        throw new Error('Domain Name is not initialized')
      }

      const command = new DescribeUserPoolDomainCommand({
        Domain: this._userPoolDomainName
      })
      const data = await this._cognitoClient.send(command)
      // Check if DomainDescription exists and is not empty
      const isExists =
        data.DomainDescription && Object.keys(data.DomainDescription).length > 0
      return !!isExists
    } catch (err: any) {
      // If the domain doesn't exist, the SDK throws an exception
      if (err.code === 'ResourceNotFoundException') {
        return false
      }
      console.error('Error checkDomainExists:', err)
      throw err // If it's any other error, rethrow it
    }
  }
}
