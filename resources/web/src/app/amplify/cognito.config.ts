'use client'
import { Amplify } from 'aws-amplify'
import { amplifyConfig } from '@/configures/amplify'

if (amplifyConfig) {
  Amplify.configure(
    {
      Auth: amplifyConfig
    },
    {
      ssr: true
    }
  )
}

export default function AmplifyConfigClientSide() {
  return null
}
