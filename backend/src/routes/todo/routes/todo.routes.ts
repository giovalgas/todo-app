import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import todoService, { TodoService } from '../services/todo.service'
import todoRepository from '../repositories/todo.repository'
import {
  TodoRequestDTO,
  TodoRequestDTOSchema,
} from '../dtos/request/todo-request-dto'
import {
  TodoResponseDTO,
  TodoResponseDTOSchema,
} from '../dtos/response/todo-response.dto'
import {
  PaginationDTO,
  PaginationDTOSchema,
} from '../../../common/page/dto/pagination.dto'
import { Page } from '../../../common/page/model/page.model'
import { Type } from '@sinclair/typebox'
import {
  TodoUpdateStatusRequestDTO,
  TodoUpdateStatusRequestDTOSchema,
} from '../dtos/request/todo-update-status-request.dto'
import {
  TodoDeleteRequestDTO,
  TodoDeleteRequestDTOSchema,
} from '../dtos/request/todo-delete-request.dto'
import {
  ObjectIdSchema,
  ObjectIdType,
} from '../../../common/schema/objectid.schema'
import kafkaProducer from '../hooks/todo-kafka.hook'
import {
  TodoCountResponseDTO,
  TodoCountResponseDTOSchema,
} from '../dtos/response/todo-count-response.dto'

declare module 'fastify' {
  interface FastifyInstance {
    todoService: TodoService
  }
}

const todoRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  /**
   * This will inject `fastify` with `todoService`
   */
  fastify.decorate(
    'todoService',
    todoService({
      todoRepository: todoRepository({
        collection: fastify.mongo.db!.collection('todo'),
      }),
    }),
    ['mongo']
  )

  fastify.get<{
    Querystring: PaginationDTO
    Reply: Page<typeof TodoResponseDTOSchema>
  }>(
    '/',
    {
      schema: {
        querystring: PaginationDTOSchema,
      },
    },
    async function (request, reply) {
      return reply.send(await this.todoService.findTodos(request.query))
    }
  )

  fastify.get<{ Reply: TodoCountResponseDTO }>(
    '/statistics',
    {
      schema: {
        response: { 200: TodoCountResponseDTOSchema },
      },
    },
    async function (_request, reply) {
      return reply.send(await this.todoService.findTodoStatistics())
    }
  )

  fastify.post<{ Body: TodoRequestDTO; Reply: TodoResponseDTO }>(
    '/',
    {
      onSend: kafkaProducer({ type: 'CREATE', fastify: fastify }),
      schema: {
        body: TodoRequestDTOSchema,
        response: {
          200: TodoResponseDTOSchema,
        },
      },
    },
    async function (request, reply) {
      return reply.send(await this.todoService.createTodo(request.body))
    }
  )

  fastify.patch<{
    Body: TodoRequestDTO
    Reply: TodoResponseDTO
    Params: { id: ObjectIdType }
  }>(
    '/:id',
    {
      onSend: kafkaProducer({ type: 'UPDATE', fastify: fastify }),
      schema: {
        body: TodoRequestDTOSchema,
        response: { 200: TodoResponseDTOSchema },
        params: Type.Object({ id: ObjectIdSchema }),
      },
    },
    async function (request, reply) {
      return reply.send(
        await this.todoService.updateTodoDescription(
          request.body,
          request.params['id']
        )
      )
    }
  )

  fastify.patch<{
    Body: TodoUpdateStatusRequestDTO
    Reply: TodoResponseDTO
    Params: { id: ObjectIdType }
  }>(
    '/update-status/:id',
    {
      onSend: kafkaProducer({ type: 'UPDATE', fastify: fastify }),
      schema: {
        body: TodoUpdateStatusRequestDTOSchema,
        response: { 200: TodoResponseDTOSchema },
        params: Type.Object({ id: ObjectIdSchema }),
      },
    },
    async function (request, reply) {
      return reply.send(
        await this.todoService.updateTodoStatus(
          request.body,
          request.params['id']
        )
      )
    }
  )

  fastify.patch<{ Body: TodoUpdateStatusRequestDTO; Reply: TodoResponseDTO[] }>(
    '/update-status',
    {
      onSend: kafkaProducer({ type: 'UPDATE', fastify: fastify }),
      schema: {
        body: TodoUpdateStatusRequestDTOSchema,
        response: { 200: Type.Array(TodoResponseDTOSchema) },
      },
    },
    async function (request, reply) {
      return reply.send(
        await this.todoService.batchUpdateTodoStatus(request.body)
      )
    }
  )

  fastify.delete<{ Params: { id: ObjectIdType } }>(
    '/:id',
    { schema: { params: Type.Object({ id: ObjectIdSchema }) } },
    async function (request, reply) {
      this.todoService.deleteTodo(request.params['id'])
      return reply.status(204).send()
    }
  )

  fastify.delete<{ Body: TodoDeleteRequestDTO }>(
    '/',
    { schema: { body: TodoDeleteRequestDTOSchema } },
    async function (request, reply) {
      this.todoService.batchDeleteTodos(request.body)
      return reply.status(204).send()
    }
  )
}
export default todoRoutes
