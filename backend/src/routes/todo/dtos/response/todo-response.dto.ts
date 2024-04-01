import { Static, Type } from '@sinclair/typebox'

export const TodoResponseDTOSchema = Type.Object({
  _id: Type.Uint8Array(),
  body: Type.String(),
  completed: Type.Boolean(),
  completedAt: Type.Optional(Type.Date()),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
})

export type TodoResponseDTO = Static<typeof TodoResponseDTOSchema>
