import { FastifyReply } from 'fastify'
import PaginationDTO from '../../../common/dto/pagination.dto'
import TodoRequestDTO from '../dtos/request/todo-request.dto'
import TodoUpdateStatusRequestDTO from '../dtos/request/todo-update-status-request.dto'
import TodoDeleteRequestDTO from '../dtos/request/todo-delete-request.dto'

const todoController = {
  findTodos: (reply: FastifyReply, requestDTO: PaginationDTO) => {
    return reply.send(requestDTO)
  },

  createTodo: (reply: FastifyReply, requestDTO: TodoRequestDTO) => {
    return reply.send(requestDTO)
  },

  updateTodoDescription: (
    reply: FastifyReply,
    requestDTO: TodoRequestDTO,
    id: number
  ) => {
    return reply.send({ requestDTO, id })
  },

  updateTodoStatus: (
    reply: FastifyReply,
    requestDTO: TodoUpdateStatusRequestDTO,
    id: number
  ) => {
    return reply.send({ requestDTO, id })
  },

  batchUpdateTodoStatus: (
    reply: FastifyReply,
    requestDTO: TodoUpdateStatusRequestDTO
  ) => {
    return reply.send(requestDTO)
  },

  deleteTodo: (reply: FastifyReply, id: number) => {
    return reply.send({ id })
  },

  batchDeleteTodos: (reply: FastifyReply, requestDTO: TodoDeleteRequestDTO) => {
    return reply.send(requestDTO)
  },
}

export default todoController
