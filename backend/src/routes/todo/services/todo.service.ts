import { TodoRepository } from '../repositories/todo.repository'
import { TodoRequestDTO } from '../dtos/request/todo-request-dto'
import { PaginationDTO } from '../../../common/page/dto/pagination.dto'
import { Page } from '../../../common/page/model/page.model'
import {
  TodoResponseDTO,
  TodoResponseDTOSchema,
} from '../dtos/response/todo-response.dto'
import { TodoUpdateStatusRequestDTO } from '../dtos/request/todo-update-status-request.dto'
import { TodoDeleteRequestDTO } from '../dtos/request/todo-delete-request.dto'

export interface TodoService {
  findTodos: (
    requestDTO: PaginationDTO
  ) => Promise<Page<typeof TodoResponseDTOSchema>>
  createTodo: (requestDTO: TodoRequestDTO) => Promise<TodoResponseDTO>
  batchDeleteTodos: (requestDTO: TodoDeleteRequestDTO) => void
  updateTodoDescription: (
    requestDTO: TodoRequestDTO,
    id: Uint8Array
  ) => Promise<TodoResponseDTO>
  updateTodoStatus: (
    requestDTO: TodoUpdateStatusRequestDTO,
    id: Uint8Array
  ) => Promise<TodoResponseDTO>
  deleteTodo: (id: Uint8Array) => void
  batchUpdateTodoStatus: (
    requestDTO: TodoUpdateStatusRequestDTO
  ) => Promise<TodoResponseDTO[]>
}

const todoService = function ({
  todoRepository,
}: {
  todoRepository: TodoRepository
}): TodoService {
  return {
    findTodos: async function (
      requestDTO: PaginationDTO
    ): Promise<Page<typeof TodoResponseDTOSchema>> {
      return {
        count: await todoRepository.findTodoCount(),
        list: await todoRepository.findTodos(requestDTO),
      }
    },

    createTodo: async function (
      requestDTO: TodoRequestDTO
    ): Promise<TodoResponseDTO> {
      return await todoRepository.createTodo(requestDTO)
    },

    updateTodoDescription: async function (
      requestDTO: TodoRequestDTO,
      id: Uint8Array
    ): Promise<TodoResponseDTO> {
      return await todoRepository.updateTodoDescription(id, requestDTO.body)
    },

    updateTodoStatus: async function (
      requestDTO: TodoUpdateStatusRequestDTO,
      id: Uint8Array
    ): Promise<TodoResponseDTO> {
      return await todoRepository.updateTodoStatus(id, requestDTO.completed)
    },

    deleteTodo: function (id: Uint8Array): void {
      todoRepository.deleteTodo(id)
    },

    batchUpdateTodoStatus: async function (
      requestDTO: TodoUpdateStatusRequestDTO
    ): Promise<TodoResponseDTO[]> {
      return Promise.all(
        requestDTO.idList!.map(
          async (id): Promise<TodoResponseDTO> =>
            await this.updateTodoStatus(requestDTO, id)
        )
      )
    },

    batchDeleteTodos: function (requestDTO: TodoDeleteRequestDTO) {
      requestDTO.idList.forEach((id) => this.deleteTodo(id))
    },
  }
}

export default todoService
