import { TMethod } from './types/method.type'

class APIGateway {
  private _api: sst.aws.ApiGatewayV2
  private _links: sst.Linkable<Record<string, any>>[] = []

  constructor(name: string, options: sst.aws.ApiGatewayV2Args) {
    this._api = new sst.aws.ApiGatewayV2(name, options)
  }

  //#region Route
  private addRoute(
    method: TMethod,
    path: string,
    handler: string,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    const handlerOptions: sst.aws.FunctionArgs = {
      link: this._links,
      handler: handler
    }
    this._api.route(`${method} ${path}`, handlerOptions, auth)
  }

  public get(
    path: string,
    handler: string,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.addRoute(`GET`, path, handler, auth)
  }

  public post(
    path: string,
    handler: string,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.addRoute(`POST`, path, handler, auth)
  }

  public put(
    path: string,
    handler: string,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.addRoute(`PUT`, path, handler, auth)
  }

  public delete(
    path: string,
    handler: string,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.addRoute(`DELETE`, path, handler, auth)
  }

  public options(
    path: string,
    handler: string,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.addRoute(`OPTIONS`, path, handler, auth)
  }

  public patch(
    path: string,
    handler: string,
    auth?: sst.aws.ApiGatewayV2RouteArgs
  ) {
    this.addRoute(`PATCH`, path, handler, auth)
  }
  //#endregion

  //#region Handler Linkable
  public addLinkable(
    linkName: string,
    {
      properties,
      permissions
    }: {
      properties: Record<string, any>
      permissions?: sst.aws.FunctionPermissionArgs[]
    }
  ): sst.Linkable<Record<string, any>> {
    const _permissions = permissions
      ? permissions.map((perm) =>
          sst.aws.permission({
            actions: perm.actions,
            resources: perm.resources
          })
        )
      : []

    const linkable = new sst.Linkable(linkName, {
      properties,
      ...(_permissions.length > 0 ? { include: _permissions } : {})
    })

    this._links.push(linkable)
    return linkable
  }
  //#endregion

  public get instance() {
    return this._api
  }
}
export default APIGateway
