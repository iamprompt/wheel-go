import { Field, ObjectType } from '@nestjs/graphql'

import { Badge } from '../badge/badge.schema'

@ObjectType()
export class UserBadge {
  @Field(() => Badge)
  badge: Badge

  @Field(() => Date)
  timestamp: Date

  @Field(() => Boolean)
  isSeen: boolean
}
