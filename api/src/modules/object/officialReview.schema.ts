import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class OfficialReviewObject {
  @Field(() => Boolean, { nullable: true })
  isFlagged: boolean

  @Field(() => String, { nullable: true })
  comment: string

  @Field(() => Date, { nullable: true })
  timestamp: Date
}
