import { Container } from 'inversify'
import TRPCService from '@root/infrastructure/providers/trpc'
import JwtProvider from '@root/infrastructure/providers/jwt/jwt.provider'
import { container } from './inversify.config'

declare global {
  namespace DIContainer {
    interface $appServices {
      TRPCService: TRPCService
      JwtProvider: JwtProvider
    }

    export let $appContainer: Container = container
    export let $appServices: $appServices
  }
}

// Example access of $appServices.TRPCService
// const trpcServiceInstance = DIContainer.$appServices.TRPCService;
