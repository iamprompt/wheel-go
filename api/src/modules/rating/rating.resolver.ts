import { Args, Query, Resolver } from '@nestjs/graphql'

import { RatingSummary } from './rating.schema'
import { RatingService } from './rating.service'

@Resolver()
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Query(() => RatingSummary)
  async getRatingSummaryByPlaceId(@Args('id') id: string) {
    return this.ratingService.getPlaceRating(id)
  }

  @Query(() => [RatingSummary])
  async getRatingSummaryByPlaceIds(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return this.ratingService.getPlaceRatings(ids)
  }
}
