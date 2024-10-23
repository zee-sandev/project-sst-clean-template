import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2WithRequestContext
} from 'aws-lambda'
import { Resource } from 'sst'

export const handler = async (
  event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>
) => {
  console.log(Resource.Auth.issuer)
  console.log(Resource.Auth.clientId)
  return {
    statusCode: 200,
    body: 'Hello World'
  }
}
