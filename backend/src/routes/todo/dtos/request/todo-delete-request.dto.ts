import { Static, Type } from '@sinclair/typebox'

export const TodoDeleteRequestDTOSchema = Type.Object({
  idList: Type.Array(Type.Uint8Array()),
})

export type TodoDeleteRequestDTO = Static<typeof TodoDeleteRequestDTOSchema>
