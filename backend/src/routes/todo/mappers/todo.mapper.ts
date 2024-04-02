import { TodoResponseDTO } from '../dtos/response/todo-response.dto'
import TodoEntity from '../../../entities/todo.entity'

const todoMapper = {
  fromEntity: function (entity: TodoEntity): TodoResponseDTO {
    return {
      ...entity,
      _id: entity._id?.toHexString(),
      updatedAt: entity.updatedAt.toDateString(),
      createdAt: entity.createdAt.toDateString(),
      completedAt: entity.completedAt?.toDateString(),
    }
  },
}

export default todoMapper
