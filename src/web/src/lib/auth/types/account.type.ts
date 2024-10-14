import { FetchUserAttributesOutput } from 'aws-amplify/auth'

export type TAuthParams = {
  username: string
  password: string
}

export type TAttributes = {
  email: string
}

export type TAccount = {
  username: string
  userId: string
  attributes?: FetchUserAttributesOutput
}
