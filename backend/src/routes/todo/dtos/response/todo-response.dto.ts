import { Static, Type } from '@sinclair/typebox'
import { ObjectIdSchema } from '../../../../common/schema/objectid.schema'

export const TodoResponseDTOSchema = Type.Object({
  _id: Type.Optional(ObjectIdSchema),
  body: Type.String(),
  completed: Type.Boolean(),
  completedAt: Type.Union([Type.Null(), Type.String({ format: 'date-time' })]),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
})

export type TodoResponseDTO = Static<typeof TodoResponseDTOSchema>
