import { Static, Type } from '@sinclair/typebox'

export const TodoCountResponseDTOSchema = Type.Object({
  count: Type.Number(),
  countCompleted: Type.Number(),
  countUncompleted: Type.Number(),
})

export type TodoCountResponseDTO = Static<typeof TodoCountResponseDTOSchema>
