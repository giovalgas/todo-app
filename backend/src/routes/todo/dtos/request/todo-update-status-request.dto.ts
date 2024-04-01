import { Static, Type } from '@sinclair/typebox'

export const TodoUpdateStatusRequestDTOSchema = Type.Object({
  idList: Type.Optional(Type.Array(Type.Uint8Array())),
  completed: Type.Boolean(),
})

export type TodoUpdateStatusRequestDTO = Static<
  typeof TodoUpdateStatusRequestDTOSchema
>
