import { FastifyPluginAsync } from 'fastify'

/**
 *
 * This endpoint is used to check the server's health
 *
 * @param fastify
 */
const healthcheck: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async function (_, reply) {
    return reply.status(200).send({ message: 'The server is up and running' })
  })
}

export default healthcheck
