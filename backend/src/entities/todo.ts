import { mongodb } from '@fastify/mongodb'

export default interface Todo {
  _id: mongodb.ObjectId
  body: string
  completed: boolean
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
