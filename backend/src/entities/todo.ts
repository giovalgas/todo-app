import { Static, Type } from '@sinclair/typebox'

export const TodoSchema = Type.Object({
  _id: Type.Uint8Array(),
  body: Type.String(),
  completed: Type.Boolean(),
  completedAt: Type.Optional(Type.Date()),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
})

export type Todo = Static<typeof TodoSchema>
