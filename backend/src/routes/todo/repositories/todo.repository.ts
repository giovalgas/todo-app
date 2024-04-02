import { mongodb } from '@fastify/mongodb'
import { TodoRequestDTO } from '../dtos/request/todo-request-dto'
import { PaginationDTO } from '../../../common/page/dto/pagination.dto'
import { ObjectIdType } from '../../../common/schema/objectid.schema'
import TodoEntity from '../../../entities/todo.entity'
import { TodoCountResponseDTO } from '../dtos/response/todo-count-response.dto'

export interface TodoRepository {
  createTodo: (todo: TodoRequestDTO) => Promise<TodoEntity>
  findTodoCount: () => Promise<number>
  findTodos: (page: PaginationDTO) => Promise<TodoEntity[]>
  updateTodoStatus: (
    id: ObjectIdType,
    newStatus: boolean
  ) => Promise<TodoEntity>
  deleteTodo: (id: ObjectIdType) => void
  updateTodoDescription: (
    id: ObjectIdType,
    newDescription: string
  ) => Promise<TodoEntity>
  findTodoStatistics: () => Promise<TodoCountResponseDTO>
}

const todoRepository = function ({
  collection,
}: {
  collection: mongodb.Collection<TodoEntity>
}): TodoRepository {
  return {
    findTodoStatistics: async (): Promise<TodoCountResponseDTO> => {
      const result = await collection
        .aggregate([
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              countCompleted: {
                $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] },
              },
              countUncompleted: {
                $sum: { $cond: [{ $eq: ['$completed', false] }, 1, 0] },
              },
            },
          },
        ])
        .toArray()

      return result[0] as TodoCountResponseDTO
    },

    createTodo: async (todo: TodoRequestDTO): Promise<TodoEntity> => {
      const insertedId = await collection
        .insertOne({
          body: todo.body,
          createdAt: new Date(),
          completed: false,
          completedAt: null,
          updatedAt: new Date(),
        })
        .then((i) => i.insertedId)
      const insertedDocument = await collection.findOne({ _id: insertedId })

      return insertedDocument!
    },

    findTodoCount: async (): Promise<number> => {
      return collection.countDocuments()
    },

    findTodos: async (page: PaginationDTO): Promise<TodoEntity[]> => {
      return collection
        .find()
        .skip(page.page - 1)
        .limit(page.pageSize)
        .toArray()
    },

    updateTodoStatus: async (
      id: ObjectIdType,
      newStatus: boolean
    ): Promise<TodoEntity> => {
      const updatedDocument = await collection.findOneAndUpdate(
        { _id: new mongodb.ObjectId(id) },
        {
          $set: {
            completed: newStatus,
            updatedAt: new Date(),
            completedAt: newStatus ? new Date() : undefined,
          },
        },
        { returnDocument: 'after' }
      )

      if (!updatedDocument) {
        throw Error(`No todos by the id: ${id} where found.`)
      }

      return updatedDocument
    },

    updateTodoDescription: async (
      id: ObjectIdType,
      newDescription: string
    ): Promise<TodoEntity> => {
      const updatedDocument = await collection.findOneAndUpdate(
        { _id: new mongodb.ObjectId(id) },
        {
          $set: {
            body: newDescription,
            updatedAt: new Date(),
          },
        },
        { returnDocument: 'after' }
      )

      if (!updatedDocument) {
        throw Error(`No todos by the id: ${id} where found.`)
      }

      return updatedDocument
    },

    deleteTodo: (id: ObjectIdType) => {
      collection.deleteOne({ _id: new mongodb.ObjectId(id) })
    },
  }
}
export default todoRepository
