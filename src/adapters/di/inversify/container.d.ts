import { Container } from 'inversify'
import TRPCService from '../trpc'
import { container } from './inversify.config'

declare global {
  namespace DIContainer {
    interface $appServices {
      TRPCService: TRPCService
    }

    export let $appContainer: Container = container
    export let $appServices: $appServices
  }
}

// Example access of $appServices.TRPCService
// const trpcServiceInstance = DIContainer.$appServices.TRPCService;
