import { HelloSchema } from '@root/adapters/validations/example/hello.schema'

export const helloController = (input: HelloSchema) => {
  return `Hello, ${input.name}!`
}
