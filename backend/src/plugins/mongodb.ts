import fp from 'fastify-plugin'
import mongodb, { FastifyMongodbOptions } from '@fastify/mongodb'

/**
 * This plugin is used to connect to the mongodb database
 *
 * @see https://github.com/fastify/fastify-mongodb
 */
export default fp<FastifyMongodbOptions>(async (fastify) => {
  await fastify.register(mongodb, {
    database: fastify.config.DB_DATABASE,
    url: `mongodb://${fastify.config.DB_HOST}:${fastify.config.DB_PORT}`,
    auth: {
      username: fastify.config.DB_USERNAME,
      password: fastify.config.DB_PASSWORD,
    },
  })
})
