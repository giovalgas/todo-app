import { FastifyReply } from 'fastify'
import PaginationDTO from '../../../common/page/dto/pagination.dto'
import TodoRequestDTO from '../dtos/request/todo-request-dto'
import TodoUpdateStatusRequestDTO from '../dtos/request/todo-update-status-request.dto'
import TodoDeleteRequestDTO from '../dtos/request/todo-delete-request.dto'
import todoService from '../services/todo.service'

const todoController = {
  findTodos: (reply: FastifyReply, requestDTO: PaginationDTO) => {
    return reply.send(todoService.findTodos(requestDTO))
  },

  createTodo: (reply: FastifyReply, requestDTO: TodoRequestDTO) => {
    return reply.send(todoService.createTodo(requestDTO))
  },

  updateTodoDescription: (
    reply: FastifyReply,
    requestDTO: TodoRequestDTO,
    id: number
  ) => {
    return reply.send(todoService.updateTodoDescription(requestDTO, id))
  },

  updateTodoStatus: (
    reply: FastifyReply,
    requestDTO: TodoUpdateStatusRequestDTO,
    id: number
  ) => {
    return reply.send(todoService.updateTodoStatus(requestDTO, id))
  },

  batchUpdateTodoStatus: (
    reply: FastifyReply,
    requestDTO: TodoUpdateStatusRequestDTO
  ) => {
    return reply.send(todoService.batchUpdateTodoStatus(requestDTO))
  },

  deleteTodo: (reply: FastifyReply, id: number) => {
    return reply.status(204).send({ id })
  },

  batchDeleteTodos: (reply: FastifyReply, requestDTO: TodoDeleteRequestDTO) => {
    return reply.status(204).send(requestDTO)
  },
}

export default todoController
