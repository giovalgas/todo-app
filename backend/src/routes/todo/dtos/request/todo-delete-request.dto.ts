import { mongodb } from '@fastify/mongodb'

export default interface TodoDeleteRequestDTO {
  idList: mongodb.ObjectId[]
}
