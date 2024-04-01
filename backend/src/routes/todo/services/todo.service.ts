import PaginationDTO from '../../../common/page/dto/pagination.dto'
import TodoRequestDTO from '../dtos/request/todo-request-dto'
import TodoUpdateStatusRequestDTO from '../dtos/request/todo-update-status-request.dto'
import TodoDeleteRequestDTO from '../dtos/request/todo-delete-request.dto'
import TodoResponseDTO from '../dtos/response/todo-response.dto'
import Page from '../../../common/page/model/page.model'
import todoRepository from '../repositories/todo.repository'
import { mongodb } from '@fastify/mongodb'

const todoService = {
  findTodos: async (
    requestDTO: PaginationDTO
  ): Promise<Page<TodoResponseDTO>> => {
    return {
      count: await todoRepository.findTodoCount(),
      list: await todoRepository.findTodos(requestDTO),
    }
  },

  createTodo: async (requestDTO: TodoRequestDTO): Promise<TodoResponseDTO> => {
    return await todoRepository.createTodo(requestDTO)
  },

  updateTodoDescription: async (
    requestDTO: TodoRequestDTO,
    id: mongodb.ObjectId
  ): Promise<TodoResponseDTO> => {
    return await todoRepository.updateTodoDescription(id, requestDTO.body)
  },

  updateTodoStatus: async (
    requestDTO: TodoUpdateStatusRequestDTO,
    id: mongodb.ObjectId
  ): Promise<TodoResponseDTO> => {
    return await todoRepository.updateTodoStatus(id, requestDTO.completed)
  },

  deleteTodo: (id: mongodb.ObjectId): void => {
    todoRepository.deleteTodo(id)
  },

  batchUpdateTodoStatus: async (
    requestDTO: TodoUpdateStatusRequestDTO
  ): Promise<TodoResponseDTO[]> => {
    return Promise.all(
      requestDTO.idList!.map(
        async (id): Promise<TodoResponseDTO> =>
          await todoService.updateTodoStatus(requestDTO, id)
      )
    )
  },

  batchDeleteTodos: (requestDTO: TodoDeleteRequestDTO) => {
    return requestDTO.idList.map((id) => todoService.deleteTodo(id))
  },
}

export default todoService
