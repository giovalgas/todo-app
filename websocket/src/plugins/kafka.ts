import fp from 'fastify-plugin'
import kafka, { FastifyKafkaOptions } from '@fastify/kafka'

export const TODO_TOPIC = 'todo'

/**
 * This plugin adds kafka sub capability
 *
 * @see https://github.com/fastify/fastify-kafka
 */
export default fp<FastifyKafkaOptions>(async (fastify) => {
  fastify
    .register(kafka, {
      consumer: {
        'metadata.broker.list': fastify.config.KAFKA_BROKER,
        'group.id': fastify.config.KAFKA_GROUP_ID,
        'fetch.wait.max.ms': 10,
        'fetch.error.backoff.ms': 50,
      },
      consumerTopicConf: {
        'auto.offset.reset': 'earliest',
      },
    })
    .after(() => {
      fastify.kafka.consume()
    })
})
