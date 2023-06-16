import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'

import { FacilitiesAvailability } from '../object/facilityAvailability.schema'
import { RatingTagCount } from '../object/ratingTagCount.schema'

@ObjectType()
export class RatingSummary {
  @Field(() => ID!)
  id: string

  @Field(() => Float)
  overall: number

  @Field(() => FacilitiesAvailability)
  facilities: FacilitiesAvailability

  @Field(() => [RatingTagCount])
  tags: RatingTagCount[]

  @Field(() => Int)
  reviewCount: number
}
