import { TMethod } from './types/method.type'

class APIGateway {
  private api: sst.aws.ApiGatewayV2
  constructor(name: string, options: sst.aws.ApiGatewayV2Args) {
    this.api = new sst.aws.ApiGatewayV2(name, options)
  }

  public addRoute(
    method: TMethod,
    path: string,
    handler: string | sst.aws.FunctionArgs | sst.aws.FunctionArn,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.api.route(`${method} ${path}`, handler, auth)
  }

  public get(
    path: string,
    handler: string | sst.aws.FunctionArgs | sst.aws.FunctionArn,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.api.route(`GET ${path}`, handler, auth)
  }

  public post(
    path: string,
    handler: string | sst.aws.FunctionArgs | sst.aws.FunctionArn,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.api.route(`POST ${path}`, handler, auth)
  }

  public put(
    path: string,
    handler: string | sst.aws.FunctionArgs | sst.aws.FunctionArn,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.api.route(`PUT ${path}`, handler, auth)
  }

  public delete(
    path: string,
    handler: string | sst.aws.FunctionArgs | sst.aws.FunctionArn,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.api.route(`DELETE ${path}`, handler, auth)
  }

  public options(
    path: string,
    handler: string | sst.aws.FunctionArgs | sst.aws.FunctionArn,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.api.route(`OPTIONS ${path}`, handler, auth)
  }

  public patch(
    path: string,
    handler: string | sst.aws.FunctionArgs | sst.aws.FunctionArn,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.api.route(`PATCH ${path}`, handler, auth)
  }

  public get instance() {
    return this.api
  }
}
export default APIGateway
