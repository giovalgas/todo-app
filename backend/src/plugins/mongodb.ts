import fp from 'fastify-plugin'
import mongodb, { FastifyMongodbOptions } from '@fastify/mongodb'

/**
 * This plugin is used to connect to the mongodb database
 *
 * @see https://github.com/fastify/fastify-mongodb
 */
export default fp<FastifyMongodbOptions>(async (fastify) => {
  fastify.register(mongodb)
})
