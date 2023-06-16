import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Review } from '../review/review.schema'
import { Route } from '../route/route.schema'
import { User } from '../user/user.schema'

@ObjectType()
export class ActivityLog {
  @Field(() => ID!)
  id: string

  @Field(() => String)
  action: string

  @Field(() => User)
  user: User

  @Field(() => Number)
  point: number

  @Field(() => Review, { nullable: true })
  review: Review

  @Field(() => Route, { nullable: true })
  route: Route

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
