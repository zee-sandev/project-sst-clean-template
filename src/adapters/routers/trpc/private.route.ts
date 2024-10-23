const t = global.DIContainer.$appServices.TRPCService.TrpcInstance

if (!t) {
  throw new Error('TRPCService is not initialized')
}

export const privateRouter = t.router({
  hello: t.procedure.query(() => 'Hello World')
})
