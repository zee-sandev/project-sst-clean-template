export default interface ILinkable {
  links: sst.Linkable<Record<string, any>>[]

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
}
