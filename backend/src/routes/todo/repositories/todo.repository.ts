import { mongodb } from '@fastify/mongodb'
import { TodoRequestDTO } from '../dtos/request/todo-request-dto'
import { PaginationDTO } from '../../../common/page/dto/pagination.dto'
import { Todo } from '../../../entities/todo'

export interface TodoRepository {
  createTodo: (todo: TodoRequestDTO) => Promise<Todo>
  findTodoCount: () => Promise<number>
  findTodos: (page: PaginationDTO) => Promise<Todo[]>
  updateTodoStatus: (id: Uint8Array, newStatus: boolean) => Promise<Todo>
  deleteTodo: (id: Uint8Array) => void
  updateTodoDescription: (
    id: Uint8Array,
    newDescription: string
  ) => Promise<Todo>
}

const todoRepository = function ({
  collection,
}: {
  collection: mongodb.Collection<Todo>
}): TodoRepository {
  return {
    createTodo: async (todo: TodoRequestDTO): Promise<Todo> => {
      const insertedId = await collection
        .insertOne({
          _id: mongodb.ObjectId.generate(),
          body: todo.body,
          createdAt: new Date(),
          completed: false,
          completedAt: undefined,
          updatedAt: new Date(),
        })
        .then((i) => i.insertedId)
      const insertedDocument = await collection.findOne({ _id: insertedId })

      return insertedDocument!
    },

    findTodoCount: async (): Promise<number> => {
      return collection.countDocuments()
    },

    findTodos: async (page: PaginationDTO): Promise<Todo[]> => {
      return collection
        .find()
        .skip(page.page - 1)
        .limit(page.pageSize)
        .toArray()
    },

    updateTodoStatus: async (
      id: Uint8Array,
      newStatus: boolean
    ): Promise<Todo> => {
      const updatedDocument = await collection.findOneAndUpdate(
        { _id: id },
        {
          completed: newStatus,
          updatedAt: new Date(),
          completedAt: newStatus ? new Date() : null,
        }
      )

      return updatedDocument!
    },

    updateTodoDescription: async (
      id: Uint8Array,
      newDescription: string
    ): Promise<Todo> => {
      const updatedDocument = await collection.findOneAndUpdate(
        { _id: id },
        {
          body: newDescription,
          updatedAt: new Date(),
        }
      )

      return updatedDocument!
    },

    deleteTodo: (id: Uint8Array) => {
      collection.deleteOne({ _id: id })
    },
  }
}
export default todoRepository
