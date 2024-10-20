import APIGateway from './api.infra'

const api = new APIGateway('api', {
  // cors: {
  //   allowCredentials: true,
  //   allowHeaders: ['Content-Type','Authorization'],
  //   allowOrigins: ['https://localhost:9000'],
  //   // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // },
  // domain: 'api.my-app.com',
})

api.addRoute('GET', '/trpc/{proxy+}', 'src/adapters/handlers/trpc.handler')
api.addRoute('POST', '/trpc/{proxy+}', 'src/adapters/handlers/trpc.handler')
api.addRoute('GET', '/example', 'src/adapters/handlers/example/index.handler')

const apiInstance: sst.aws.ApiGatewayV2 = api.instance
export { apiInstance }
