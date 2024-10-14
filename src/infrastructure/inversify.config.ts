// src/inversify.config.ts
import { Container } from 'inversify'
// import { trpc } from '@in';
const trpc = require('./server/trpc/trpc')
const container = new Container()
// container.bind('TRPC').toConstantValue(trpc); // Bind the tRPC instance as a singleton

export { container }
