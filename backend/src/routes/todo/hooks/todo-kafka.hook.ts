import { onSendMetaHookHandler } from 'fastify/types/hooks'
import { FastifyInstance } from 'fastify'
import { TODO_TOPIC } from '../../../plugins/kafka'
import * as crypto from 'crypto'

const kafkaProducer =
  ({
    type,
    fastify,
  }: {
    type: 'CREATE' | 'UPDATE'
    fastify: FastifyInstance
  }): onSendMetaHookHandler =>
  async (_request, _reply, payload) => {
    fastify.kafka.push({
      topic: TODO_TOPIC,
      payload: JSON.stringify({
        type: type,
        payload: JSON.parse(payload as string),
      }),
      key: crypto.randomBytes(1).toString('hex'),
      partition: 0,
    })

    return payload
  }

export default kafkaProducer
