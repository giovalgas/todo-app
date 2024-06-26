import { FastifyPluginAsync } from 'fastify'

/**
 *
 * Default root endpoint, generated by fastify-cli
 *
 * @param fastify
 */
const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async function () {
    return { root: true }
  })
}

export default root
