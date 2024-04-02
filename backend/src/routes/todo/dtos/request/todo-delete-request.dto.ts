import { Static, Type } from '@sinclair/typebox'
import { ObjectIdSchema } from '../../../../common/schema/objectid.schema'

export const TodoDeleteRequestDTOSchema = Type.Object({
  idList: Type.Array(ObjectIdSchema),
})

export type TodoDeleteRequestDTO = Static<typeof TodoDeleteRequestDTOSchema>
