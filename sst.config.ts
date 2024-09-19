/// <reference path="./.sst/platform/config.d.ts" />

import '@Resources/Core/types/global'

export default $config({
  app(input) {
    return {
      name: 'sst-clean-template',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws'
    }
  },
  async run() {
    const { web } = await import('@/resources/Infrastructure/sst/nextApp.infra')
    const { userPool } = await import(
      '@Resources/Infrastructure/sst/Cognito/userPool.infra'
    )
    return {
      WebURL: web.url,
      WebURN: web.urn,
      userPoolId: userPool.id,
      userPoolArn: userPool.arn
    }
  }
})
