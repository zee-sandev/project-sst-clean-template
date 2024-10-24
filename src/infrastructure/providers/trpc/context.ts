import { APIGatewayProxyEvent } from 'aws-lambda'
import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
// created for each request
export const createContext = async ({
  event,
  context
}: CreateAWSLambdaContextOptions<
  APIGatewayProxyEvent | APIGatewayProxyEventV2
>) => {
  if (event.pathParameters?.proxy?.startsWith('private')) {
    // Additional logic for handling private routes can be added here
    const jwtProvider = DIContainer.$appServices.JwtProvider
    const token = event.headers.authorization
    if (!token) {
      throw new Error('Unauthorized')
    }
    const decoded = await jwtProvider.verify(token)

    return {
      Auth: decoded
    }
  }

  return {}
} // no context

export type Context = Awaited<ReturnType<typeof createContext>>
// export type Context =  inferAsyncReturnType<typeof createContext>;
