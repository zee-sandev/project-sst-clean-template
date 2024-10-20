export const helloSchema = $z.object({
  name: $z.string()
})

export type HelloSchema = $z.infer<typeof helloSchema>
