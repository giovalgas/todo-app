import { Static, Type } from '@sinclair/typebox'

export const PaginationDTOSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  pageSize: Type.Number({ default: 10 }),
})

export type PaginationDTO = Static<typeof PaginationDTOSchema>
