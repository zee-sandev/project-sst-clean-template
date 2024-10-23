import APIGateway from './api.infra'

export default async function setupApiGateway(
  issuer: string,
  clientId: string
) {
  const api = new APIGateway('api', {
    // cors: {
    //   allowCredentials: true,
    //   allowHeaders: ['Content-Type','Authorization'],
    //   allowOrigins: ['https://localhost:9000'],
    //   // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // },
    // domain: 'api.my-app.com',
  })
  const apiInstance: sst.aws.ApiGatewayV2 = api.instance

  /* Create a new authorizer for the API Gateway instance using JWT authentication.
  // The authorizer will validate incoming requests based on the specified issuer and audience.
  const authorizer = apiInstance.addAuthorizer({
    name: 'authorizer', // Name of the authorizer
    jwt: {
      issuer: issuer, // The issuer of the JWT token
      audiences: [clientId] // The expected audience for the JWT token
    }
  })

  const authOptions: sst.aws.ApiGatewayV2RouteArgs = {
    auth: {
      jwt: {
        authorizer: authorizer.id
      }
    }
  }
  */

  //auth linkable
  api.addLinkable('Auth', {
    properties: {
      issuer: issuer,
      clientId: clientId
    }
  })
  //trpc routes
  api.get('/trpc/{proxy+}', 'src/adapters/handlers/trpc.handler')
  api.post('/trpc/{proxy+}', 'src/adapters/handlers/trpc.handler')

  //Example routes
  api.get('/example', 'src/adapters/handlers/example/index.handler')

  /*Example private route with auth options
  api.get(
    '/example/private',
    'src/adapters/handlers/example/private.handler',
    authOptions
  )*/

  return { apiInstance }
}
