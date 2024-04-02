import { mongodb } from '@fastify/mongodb'

export default interface TodoEntity {
  _id?: mongodb.ObjectId
  body: string
  completed: boolean
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
