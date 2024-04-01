import { mongodb } from '@fastify/mongodb'

export default interface TodoUpdateStatusRequestDTO {
  idList: mongodb.ObjectId[] | undefined
  completed: boolean
}
