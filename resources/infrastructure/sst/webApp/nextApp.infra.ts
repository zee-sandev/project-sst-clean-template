class WebApp {
  private _links: sst.Linkable<Record<string, any>>[] = []

  constructor() {}
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

  public listen() {
    const app = new sst.aws.Nextjs('web', {
      path: 'resources/web',
      link: this._links
    })
    return app
  }
}

export default WebApp
