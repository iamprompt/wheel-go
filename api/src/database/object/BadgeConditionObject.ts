import { LangObject, LangObjectDefinition } from './LangObject'

export const BadgeConditionObject = {
  type: { type: String },
  name: { type: LangObjectDefinition },
  description: { type: LangObjectDefinition },
  icon: { type: String },
  color: { type: String },
  requiredCount: { type: Number },
  filter: { type: [String] },
}

export interface BadgeCondition {
  name?: LangObject
  description?: LangObject
  icon?: string
  color?: string
  type?: string
  requiredCount?: number
  filter?: string[]
}
