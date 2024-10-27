import { helloSchema } from '@root/adapters/validations/example/hello.schema'
import { helloController } from '@root/adapters/controllers/example/hello.controller'

const t = global.DIContainer.$appServices.TRPCService.TrpcInstance

if (!t) {
  throw new Error('TRPCService is not initialized')
}

export const publicRouter = t.router({
  hello: t.procedure.input(helloSchema).query(helloController)
})
