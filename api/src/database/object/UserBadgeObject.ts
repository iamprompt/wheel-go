import { Types } from 'mongoose'

import { Badge, BadgeDocument } from '../badge/badge.schema'

export const UserBadgeObject = {
  badge: { type: Types.ObjectId, ref: Badge.name },
  timestamp: { type: Date, default: Date.now() },
  isSeen: { type: Boolean, default: false },
}

export interface UserBadge {
  badge: BadgeDocument
  timestamp: Date
  isSeen: boolean
}
