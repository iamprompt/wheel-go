import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserSummary {
  @Field(() => Float, { defaultValue: 0 })
  distance: number

  @Field(() => Int, { defaultValue: 0 })
  routes: number

  @Field(() => Int, { defaultValue: 0 })
  reviews: number

  @Field(() => Date, { nullable: true })
  joinedAt: Date
}
