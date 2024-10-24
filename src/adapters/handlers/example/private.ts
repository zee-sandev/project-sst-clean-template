import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2WithRequestContext
} from 'aws-lambda'

export const handler = async (
  event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>
) => {
  return {
    statusCode: 200,
    body: 'Hello World'
  }
}
