import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import todoController from '../controllers/todo.controller'
import PaginationDTO from '../../../common/page/dto/pagination.dto'
import TodoRequestDTO from '../dtos/request/todo-request-dto'
import TodoUpdateStatusRequestDTO from '../dtos/request/todo-update-status-request.dto'
import TodoDeleteRequestDTO from '../dtos/request/todo-delete-request.dto'

const todoRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(
    '/',
    {},
    async (
      request: FastifyRequest<{ Querystring: { queryObj: PaginationDTO } }>,
      reply: FastifyReply
    ) => {
      return todoController.findTodos(reply, request.query.queryObj)
    }
  )

  fastify.post(
    '/',
    {},
    async (
      request: FastifyRequest<{ Body: TodoRequestDTO }>,
      reply: FastifyReply
    ) => {
      return todoController.createTodo(reply, request.body)
    }
  )

  fastify.patch(
    '/:id',
    {},
    (
      request: FastifyRequest<{ Body: TodoRequestDTO; Params: { id: number } }>,
      reply: FastifyReply
    ) => {
      return todoController.updateTodoDescription(
        reply,
        request.body,
        request.params['id']
      )
    }
  )

  fastify.patch(
    '/update-status/:id',
    {},
    (
      request: FastifyRequest<{
        Body: TodoUpdateStatusRequestDTO
        Params: { id: number }
      }>,
      reply: FastifyReply
    ) => {
      return todoController.updateTodoStatus(
        reply,
        request.body,
        request.params['id']
      )
    }
  )

  fastify.patch(
    '/update-status',
    {},
    (
      request: FastifyRequest<{
        Body: TodoUpdateStatusRequestDTO
      }>,
      reply: FastifyReply
    ) => {
      return todoController.batchUpdateTodoStatus(reply, request.body)
    }
  )

  fastify.delete(
    '/:id',
    {},
    (
      request: FastifyRequest<{ Params: { id: number } }>,
      reply: FastifyReply
    ) => {
      return todoController.deleteTodo(reply, request.params['id'])
    }
  )

  fastify.delete(
    '/',
    {},
    (
      request: FastifyRequest<{ Body: TodoDeleteRequestDTO }>,
      reply: FastifyReply
    ) => {
      return todoController.batchDeleteTodos(reply, request.body)
    }
  )
}
export default todoRoutes
