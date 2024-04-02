import { Static, Type } from '@sinclair/typebox'
import { ObjectIdSchema } from '../../../../common/schema/objectid.schema'

export const TodoResponseDTOSchema = Type.Object({
  _id: Type.Optional(ObjectIdSchema),
  body: Type.String(),
  completed: Type.Boolean(),
  completedAt: Type.Optional(Type.String({ format: 'date' })),
  createdAt: Type.String({ format: 'date' }),
  updatedAt: Type.String({ format: 'date' }),
})

export type TodoResponseDTO = Static<typeof TodoResponseDTOSchema>
