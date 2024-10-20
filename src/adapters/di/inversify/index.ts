/// <reference path="./container.d.ts" />
import TRPCService from '@root/adapters/trpc'
import { container } from './inversify.config'

// Ensure the global container is set only once
if (!global.DIContainer) {
  const services = {
    TRPCService: container.get<TRPCService>(TRPCService)
  }

  global.DIContainer = { $appContainer: container, $appServices: services } // Initialize the DIContainer namespace with $appContainer as null
}

// Ensure the global container is set only once
if (!global.DIContainer.$appContainer) {
  global.DIContainer.$appContainer = container // Correctly assign the container to the global appContainer
}

// Bind TRPCService to the container as a singleton
if (!global.DIContainer.$appContainer.isBound(TRPCService)) {
  global.DIContainer.$appContainer
    .bind<TRPCService>(TRPCService)
    .toSelf()
    .inSingletonScope()
}

// Set the global TRPCService instance
if (!global.DIContainer.$appServices.TRPCService) {
  global.DIContainer.$appServices.TRPCService =
    global.DIContainer.$appContainer.get<TRPCService>(TRPCService)
}
