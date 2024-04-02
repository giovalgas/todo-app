import { Static, Type } from '@sinclair/typebox'
import { ObjectIdSchema } from '../../../../common/schema/objectid.schema'

export const TodoUpdateStatusRequestDTOSchema = Type.Object({
  idList: Type.Optional(Type.Array(ObjectIdSchema)),
  completed: Type.Boolean(),
})

export type TodoUpdateStatusRequestDTO = Static<
  typeof TodoUpdateStatusRequestDTOSchema
>
