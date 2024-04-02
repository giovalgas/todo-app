import { Static, Type } from '@sinclair/typebox'

export const ObjectIdSchema = Type.String({
  pattern: '^[0-9a-fA-F]{24}$',
  minLength: 24,
  maxLength: 24,
})

export type ObjectIdType = Static<typeof ObjectIdSchema>
