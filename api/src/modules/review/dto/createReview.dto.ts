import { Field, InputType } from '@nestjs/graphql'

import { OfficialReviewObjectInput } from '~/modules/object/dto/officialReview.dto'
import { RatingObjectInput } from '~/modules/object/dto/ratingObject.dto'

@InputType()
export class CreateReviewInput {
  @Field(() => String, { nullable: true })
  place: string

  @Field(() => String, { nullable: true })
  user: string

  @Field(() => RatingObjectInput, { nullable: true })
  rating: RatingObjectInput

  @Field({ nullable: true })
  comment: string

  @Field(() => [String], { nullable: true })
  images: string[]

  @Field(() => [String], { nullable: true })
  tags: string[]

  @Field(() => OfficialReviewObjectInput, { nullable: true })
  official: OfficialReviewObjectInput
}
