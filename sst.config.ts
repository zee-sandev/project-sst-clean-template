/// <reference path="./.sst/platform/config.d.ts" />

import '@Resources/core/types/global'

import setupSST from './resources/infrastructure/sst'

export default $config({
  app(input) {
    return {
      name: 'sst-clean-template',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        aws: {
          version: '6.52.0'
        }
      }
    }
  },
  async run() {
    return await setupSST()
  }
})
