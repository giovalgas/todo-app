import { TodoResponseDTO } from '../dtos/response/todo-response.dto'
import TodoEntity from '../../../entities/todo.entity'

const todoMapper = {
  fromEntity: function (entity: TodoEntity): TodoResponseDTO {
    return {
      ...entity,
      _id: entity._id?.toHexString(),
      updatedAt: entity.updatedAt.toISOString(),
      createdAt: entity.createdAt.toISOString(),
      completedAt: entity.completedAt?.toISOString() ?? null,
    }
  },
}

export default todoMapper
