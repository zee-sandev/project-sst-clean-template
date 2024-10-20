import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda'
import { createContext } from '@/src/adapters/trpc/context'
import 'reflect-metadata'
import '@root/adapters/di/inversify/index'
import '@root/core/types/global'

import { appRouter } from '@/src/adapters/routers/trpc/index.route'

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext
  // responseMeta: () => ({
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  //     'Access-Control-Allow-Headers': '*',
  //     'Access-Control-Allow-Credentials': 'true',
  //     'Content-Type': 'application/json'
  //   }
  // })
})
