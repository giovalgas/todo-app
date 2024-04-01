import { Static, Type } from '@sinclair/typebox'

export const TodoRequestDTOSchema = Type.Object({
  body: Type.String(),
})

export type TodoRequestDTO = Static<typeof TodoRequestDTOSchema>
