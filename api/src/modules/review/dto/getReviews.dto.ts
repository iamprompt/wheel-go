import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetReviewsInput {
  @Field(() => [String], { nullable: true })
  exclude?: string[]

  @Field(() => Number, { nullable: true })
  limit?: number
}
