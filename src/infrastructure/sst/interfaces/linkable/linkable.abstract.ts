import ILinkable from './linkable.interface'

export default abstract class Linkable implements ILinkable {
  links: sst.Linkable<Record<string, any>>[] = []

  addLinkable(
    linkName: string,
    {
      properties,
      permissions
    }: {
      properties: Record<string, any>
      permissions?: sst.aws.FunctionPermissionArgs[]
    }
  ) {
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

    this.links.push(linkable)
    return linkable
  }
}
