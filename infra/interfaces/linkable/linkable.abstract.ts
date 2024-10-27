import { Input } from '@root/.sst/platform/src/components/input'
import ILinkable from './linkable.interface'

export default abstract class Linkable implements ILinkable {
  _links: sst.Linkable<Record<string, any>>[] = []
  _SSTLinks: Input<any[]>[] = []

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

    this._links.push(linkable)
    return linkable
  }

  addSSTLinkable(linkable: Input<any>) {
    this._SSTLinks.push(linkable)
  }

  getLinks(): (sst.Linkable<Record<string, any>> | Input<any[]>)[] {
    return [...this._links, ...this._SSTLinks]
  }
}
