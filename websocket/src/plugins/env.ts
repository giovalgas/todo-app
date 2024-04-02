import fp from 'fastify-plugin'
import env, { FastifyEnvOptions } from '@fastify/env'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
    }
  }
}

const schema = {
  type: 'object',
  required: [],
  properties: {

  },
}

const config: FastifyEnvOptions = { schema, confKey: 'config', dotenv: true }

/**
 * This plugin is used to load all environment variables
 *
 * @see https://github.com/fastify/fastify-env
 */
export default fp<FastifyEnvOptions>(async (fastify) => {
  fastify.register(env, config)
})

export const autoload = false
