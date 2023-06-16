import { SchemaTimestampsConfig } from 'mongoose'

export interface Timestamp {
  createdAt: Date
  updatedAt: Date
}

export const TimestampConfig: boolean | SchemaTimestampsConfig = true
