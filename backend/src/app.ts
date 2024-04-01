import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyServerOptions,
} from 'fastify'
import fastifyEnv from './plugins/env'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}

const options: AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify: FastifyInstance,
  opts
): Promise<void> => {
  // This will add TypeBoxTypeProvider for typescript
  void fastify.withTypeProvider<TypeBoxTypeProvider>()

  // This will load fastify-env plugin
  void fastify.register(fastifyEnv)

  // This will load every fastify plugin in src/plugins
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  // This will load every route in src/routes
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    maxDepth: 1,
    options: { ...opts, prefix: '/api' },
  })
}

export default app
export { app, options }
