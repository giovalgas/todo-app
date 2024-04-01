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
import { Page, PageSchema } from '../../../common/page/model/page.model'
import { Type } from '@sinclair/typebox'
import {
  TodoUpdateStatusRequestDTO,
  TodoUpdateStatusRequestDTOSchema,
} from '../dtos/request/todo-update-status-request.dto'
import {
  TodoDeleteRequestDTO,
  TodoDeleteRequestDTOSchema,
} from '../dtos/request/todo-delete-request.dto'

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
        response: {
          200: PageSchema<typeof TodoResponseDTOSchema>,
        },
      },
    },
    async function (request, reply) {
      return reply.send(await this.todoService.findTodos(request.query))
    }
  )

  fastify.post<{ Body: TodoRequestDTO; Reply: TodoResponseDTO }>(
    '/',
    {
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
    Params: { id: Uint8Array }
  }>(
    '/:id',
    {
      schema: {
        body: TodoRequestDTOSchema,
        response: { 200: TodoResponseDTOSchema },
        params: Type.Object({ id: Type.Uint8Array() }),
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
    Params: { id: Uint8Array }
  }>(
    '/update-status/:id',
    {
      schema: {
        body: TodoUpdateStatusRequestDTOSchema,
        response: { 200: TodoResponseDTOSchema },
        params: Type.Object({ id: Type.Uint8Array() }),
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

  fastify.delete<{ Params: { id: Uint8Array } }>(
    '/:id',
    { schema: { params: Type.Object({ id: Type.Uint8Array() }) } },
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
