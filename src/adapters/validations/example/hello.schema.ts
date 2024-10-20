export const helloSchema = $z.object({
  name: $z.string()
})

export type HelloSchema = { input: $z.infer<typeof helloSchema> }
