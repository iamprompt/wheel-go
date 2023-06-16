import { Types } from 'mongoose'

type ReturnRefOrArray<T extends string | string[] | undefined | null> =
  T extends string[]
    ? Types.ObjectId[]
    : T extends string
    ? Types.ObjectId
    : undefined

export function createRefToSave<T extends string | string[] | undefined | null>(
  data: T,
): ReturnRefOrArray<T> {
  if (!data) {
    return undefined
  }

  if (Array.isArray(data)) {
    return <ReturnRefOrArray<T>>data.map((d) => new Types.ObjectId(d))
  }

  return <ReturnRefOrArray<T>>new Types.ObjectId(data)
}
