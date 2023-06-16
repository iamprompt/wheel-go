import { Badge as BadgeDB, BadgeDocument } from '~/database/badge/badge.schema'
import { Badge } from './badge.schema'
import { CreateBadgeInput } from './dto/createBadge.dto'

type ReturnActivityLogOrArray<
  T extends BadgeDocument | BadgeDocument[] | undefined | null,
> = T extends BadgeDocument[]
  ? Badge[]
  : T extends BadgeDocument
  ? Badge
  : undefined

export class BadgeFactory {
  static createFromDatabase<
    T extends BadgeDocument | BadgeDocument[] | undefined | null,
  >(badges: T, lang = 'th'): ReturnActivityLogOrArray<T> {
    if (!badges) {
      return undefined
    }

    if (Array.isArray(badges)) {
      return <ReturnActivityLogOrArray<T>>(
        badges.map((announcement) =>
          BadgeFactory.createFromDatabase(announcement, lang),
        )
      )
    }

    return <ReturnActivityLogOrArray<T>>{
      id: badges._id.toString(),
      name: badges.name,
      description: badges.description,
      icon: badges.icon,
      color: badges.color,
      conditions: badges.conditions?.map((condition) => ({
        name: condition.name,
        description: condition.description,
        icon: condition.icon,
        color: condition.color,
        type: condition.type,
        requiredCount: condition.requiredCount,
        filter: condition.filter,
      })),
    }
  }

  static createToSave(data: CreateBadgeInput): BadgeDB {
    return {
      name: data.name,
      description: data.description,
      icon: data.icon,
      color: data.color,
      conditions: data.conditions,
    }
  }
}
