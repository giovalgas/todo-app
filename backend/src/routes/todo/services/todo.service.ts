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
import { ObjectIdType } from '../../../common/schema/objectid.schema'
import todoMapper from '../mappers/todo.mapper'
import { TodoCountResponseDTO } from '../dtos/response/todo-count-response.dto'

export interface TodoService {
  findTodos: (
    requestDTO: PaginationDTO
  ) => Promise<Page<typeof TodoResponseDTOSchema>>
  findTodoStatistics: () => Promise<TodoCountResponseDTO>
  createTodo: (requestDTO: TodoRequestDTO) => Promise<TodoResponseDTO>
  batchDeleteTodos: (requestDTO: TodoDeleteRequestDTO) => void
  updateTodoDescription: (
    requestDTO: TodoRequestDTO,
    id: ObjectIdType
  ) => Promise<TodoResponseDTO>
  updateTodoStatus: (
    requestDTO: TodoUpdateStatusRequestDTO,
    id: ObjectIdType
  ) => Promise<TodoResponseDTO>
  deleteTodo: (id: ObjectIdType) => void
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
    findTodoStatistics: async function (): Promise<TodoCountResponseDTO> {
      return await todoRepository.findTodoStatistics()
    },

    findTodos: async function (
      requestDTO: PaginationDTO
    ): Promise<Page<typeof TodoResponseDTOSchema>> {
      return {
        count: await todoRepository.findTodoCount(),
        list: await todoRepository
          .findTodos(requestDTO)
          .then((todos) => todos.map((todo) => todoMapper.fromEntity(todo))),
      }
    },

    createTodo: async function (
      requestDTO: TodoRequestDTO
    ): Promise<TodoResponseDTO> {
      return await todoRepository
        .createTodo(requestDTO)
        .then((todo) => todoMapper.fromEntity(todo))
    },

    updateTodoDescription: async function (
      requestDTO: TodoRequestDTO,
      id: ObjectIdType
    ): Promise<TodoResponseDTO> {
      return await todoRepository
        .updateTodoDescription(id, requestDTO.body)
        .then((todo) => todoMapper.fromEntity(todo))
    },

    updateTodoStatus: async function (
      requestDTO: TodoUpdateStatusRequestDTO,
      id: ObjectIdType
    ): Promise<TodoResponseDTO> {
      return await todoRepository
        .updateTodoStatus(id, requestDTO.completed)
        .then((todo) => todoMapper.fromEntity(todo))
    },

    deleteTodo: function (id: ObjectIdType): void {
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
