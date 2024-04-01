import { Static, TSchema, Type } from '@sinclair/typebox'

export const PageSchema = <T extends TSchema>(T: T) =>
  Type.Object({
    count: Type.Number(),
    list: Type.Array(T),
  })

export type Page<T extends TSchema> = Static<ReturnType<typeof PageSchema<T>>>
