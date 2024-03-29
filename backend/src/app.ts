import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify'

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}

const options: AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // This will load every fastify plugin in src/plugins
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  // This will load every route in src/routes
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  })
}

export default app
export { app, options }
