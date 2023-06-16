import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class OfficialReviewObjectInput {
  @Field(() => Boolean, { nullable: true })
  isFlagged: boolean

  @Field(() => String, { nullable: true })
  comment: string

  @Field(() => Date, { nullable: true })
  timestamp: Date
}
