import { FastifyInstance, FastifyPluginAsync } from 'fastify'

const todoRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  fastify.get('/', { websocket: true }, (socket, req) => {
    console.log('Client connected')

    socket.on('close', () => {
      console.log('Client disconnected')
    })
  })
}

export default todoRoutes
