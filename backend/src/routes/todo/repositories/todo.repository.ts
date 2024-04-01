import fastify from 'fastify'
import { mongodb } from '@fastify/mongodb'
import PaginationDTO from '../../../common/page/dto/pagination.dto'
import Todo from '../../../entities/todo'
import TodoRequestDTO from '../dtos/request/todo-request-dto'

const collection = fastify().mongo.db!.collection<Todo>('todo')

const todoRepository = {
  createTodo: async (todo: TodoRequestDTO): Promise<Todo> => {
    const insertedId = await collection
      .insertOne({
        _id: new mongodb.ObjectId(),
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

  findTodos: async (page: PaginationDTO): Promise<Todo[]> => {
    console.log('ALLOOOOO')

    return collection
      .find()
      .skip(page.page - 1)
      .limit(page.pageSize)
      .toArray()
  },

  updateTodoStatus: async (
    id: mongodb.ObjectId,
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
    id: mongodb.ObjectId,
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

  deleteTodo: (id: mongodb.ObjectId) => {
    collection.deleteOne({ _id: id })
  },
}

export default todoRepository
