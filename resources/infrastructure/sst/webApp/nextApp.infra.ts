class WebApp {
  private _links: sst.Linkable<Record<string, any>>[] = []
  private _environment: Record<string, any> = {}
  private _domainName: string = 'localhost'
  private _domainConfig: sst.aws.NextjsArgs['domain'] = {
    name: this._domainName
  }
  private _port: number = 9000
  private _path: string = 'web'
  constructor() {}

  public set domainName(domainName: string) {
    this._domainName = domainName
  }

  public set domainConfig(domainConfig: sst.aws.NextjsArgs['domain']) {
    this._domainConfig = domainConfig
  }

  public set port(port: number) {
    this._port = port
  }

  public set path(path: string) {
    this._path = path
  }

  public addLinkable(
    linkName: string,
    {
      properties,
      permissions
    }: {
      properties: Record<string, any>
      permissions: sst.aws.FunctionPermissionArgs[]
    }
  ) {
    const _permissions = permissions.map((perm) =>
      sst.aws.permission({
        actions: perm.actions,
        resources: perm.resources
      })
    )

    const linkable = new sst.Linkable(linkName, {
      properties,
      ...(_permissions.length > 0 ? { include: _permissions } : {})
    })

    this._links.push(linkable)
  }

  public setEnvironment(environment: Record<string, any>) {
    this._environment = environment
  }

  public listen() {
    const app = new sst.aws.Nextjs('web', {
      path: this._path,
      link: this._links,
      domain: $dev ? undefined : this._domainConfig,
      dev: {
        url: this._domainName,
        command: `next dev -p ${this._port}`
      },
      environment: {
        NEXTAUTH_URL: this._domainName,
        ...this._environment
      }
    })

    return app
  }
}

export default WebApp
