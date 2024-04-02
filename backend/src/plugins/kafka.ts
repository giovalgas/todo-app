import fp from 'fastify-plugin'
import kafka, { FastifyKafkaOptions } from '@fastify/kafka'

export const TODO_TOPIC = 'todo'

/**
 * This plugin adds kafka pub capability
 *
 * @see https://github.com/fastify/fastify-kafka
 */
export default fp<FastifyKafkaOptions>(async (fastify) => {
  fastify.register(kafka, {
    producer: {
      'metadata.broker.list': fastify.config.KAFKA_BROKER,
      dr_cb: true,
    },
  })
})
