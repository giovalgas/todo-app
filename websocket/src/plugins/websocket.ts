import fp from 'fastify-plugin'
import websocket, { WebsocketPluginOptions } from '@fastify/websocket'

/**
 * This plugin adds websocket connection capability
 *
 * @see https://github.com/fastify/fastify-websocket
 */
export default fp<WebsocketPluginOptions>(async (fastify) => {
  fastify.register(websocket)
})
