import fp from 'fastify-plugin'
import env, { FastifyEnvOptions } from '@fastify/env'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      DB_USERNAME: string
      DB_PASSWORD: string
      DB_HOST: string
      DB_PORT: string
      DB_DATABASE: string
    }
  }
}

const schema = {
  type: 'object',
  required: ['DB_USERNAME', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'],
  properties: {
    DB_USERNAME: {
      type: 'string',
      default: '',
    },
    DB_PASSWORD: {
      type: 'string',
      default: '',
    },
    DB_HOST: {
      type: 'string',
      default: '',
    },
    DB_PORT: {
      type: 'string',
      default: '',
    },
    DB_DATABASE: {
      type: 'string',
      default: 'todo-app',
    },
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
