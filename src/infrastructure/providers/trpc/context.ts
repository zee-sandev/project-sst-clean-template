import { APIGatewayProxyEvent } from 'aws-lambda'
import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { Resource } from 'sst'
// created for each request
export const createContext = ({
  event,
  context
}: CreateAWSLambdaContextOptions<
  APIGatewayProxyEvent | APIGatewayProxyEventV2
>) => {
  // console.log(event)
  // console.log(context)
  console.log(Resource.Auth.issuer)
  console.log(Resource.Auth.clientId)
  console.log(event)
  const token = event.headers.authorization
  if (!token) {
    throw new Error('Unauthorized')
  }
  return {}
} // no context

export type Context = Awaited<ReturnType<typeof createContext>>
// export type Context =  inferAsyncReturnType<typeof createContext>;
