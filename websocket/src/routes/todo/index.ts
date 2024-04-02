import { FastifyInstance } from 'fastify'
import { TODO_TOPIC } from '../../plugins/kafka'

export default async (fastify: FastifyInstance): Promise<void> => {
  // For some weird reason @fastify/kafka doesnt provide proper typings for consumers
  // @ts-ignore
  fastify.kafka.subscribe([TODO_TOPIC]).on(TODO_TOPIC, (msg, commit) => {
    console.log(msg.value.toString())
    commit()
  })

  fastify.get('/', { websocket: true }, async function (socket, req) {
    console.log('Client connected')

    socket.on('close', () => {
      console.log('Client disconnected')
    })
  })
}
