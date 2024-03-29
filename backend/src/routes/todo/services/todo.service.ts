import PaginationDTO from '../../../common/page/dto/pagination.dto'
import TodoRequestDTO from '../dtos/request/todo-request-dto'
import TodoUpdateStatusRequestDTO from '../dtos/request/todo-update-status-request.dto'
import TodoDeleteRequestDTO from '../dtos/request/todo-delete-request.dto'
import TodoResponseDTO from '../dtos/response/todo-response.dto'
import Page from '../../../common/page/model/page.model'

const todoService = {
  findTodos: (requestDTO: PaginationDTO): Page<TodoResponseDTO> => {
    requestDTO
    return { count: 10, list: [] }
  },

  createTodo: (requestDTO: TodoRequestDTO): TodoResponseDTO => {
    requestDTO

    return {
      body: '',
      createdAt: new Date(),
      completed: false,
      completedAt: new Date(),
      updatedAt: new Date(),
    }
  },

  updateTodoDescription: (
    requestDTO: TodoRequestDTO,
    id: number
  ): TodoResponseDTO => {
    requestDTO
    id

    return {
      body: '',
      createdAt: new Date(),
      completed: false,
      completedAt: new Date(),
      updatedAt: new Date(),
    }
  },

  updateTodoStatus: (
    requestDTO: TodoUpdateStatusRequestDTO,
    id: number
  ): TodoResponseDTO => {
    id
    requestDTO

    return {
      body: '',
      createdAt: new Date(),
      completed: false,
      completedAt: new Date(),
      updatedAt: new Date(),
    }
  },

  deleteTodo: (id: number): void => {
    id
  },

  batchUpdateTodoStatus: (
    requestDTO: TodoUpdateStatusRequestDTO
  ): TodoResponseDTO[] => {
    return requestDTO.idList!.map(
      (id): TodoResponseDTO => todoService.updateTodoStatus(requestDTO, id)
    )
  },

  batchDeleteTodos: (requestDTO: TodoDeleteRequestDTO) => {
    return requestDTO.idList.map((id) => todoService.deleteTodo(id))
  },
}

export default todoService
