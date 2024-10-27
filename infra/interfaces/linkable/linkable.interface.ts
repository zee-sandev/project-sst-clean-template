import { Input } from '@root/.sst/platform/src/components/input'

export default interface ILinkable {
  _links: sst.Linkable<Record<string, any>>[]
  _SSTLinks: Input<any[]>[]

  addLinkable: (
    linkName: string,
    {
      properties,
      permissions
    }: {
      properties: Record<string, any>
      permissions?: sst.aws.FunctionPermissionArgs[]
    }
  ) => sst.Linkable<Record<string, any>>

  addSSTLinkable: (linkable: Input<any>) => void
  getLinks: () => (sst.Linkable<Record<string, any>> | Input<any[]>)[]
}
