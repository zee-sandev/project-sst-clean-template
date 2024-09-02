/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'sst-clean-template',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws'
    }
  },
  async run() {
    const { web } = await import(
      '@/resources/infrastructure/sst/next-app.infra'
    )
    return {
      WebURL: web.url,
      WebURN: web.urn
    }
  }
})
