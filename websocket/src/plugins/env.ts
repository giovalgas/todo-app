import fp from 'fastify-plugin'
import env, { FastifyEnvOptions } from '@fastify/env'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      KAFKA_BROKER: string
      KAFKA_GROUP_ID: string
    }
  }
}

const schema = {
  type: 'object',
  required: [],
  properties: {
    KAFKA_BROKER: {
      type: 'string',
      default: '127.0.0.1:9092',
    },
    KAFKA_GROUP_ID: {
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
