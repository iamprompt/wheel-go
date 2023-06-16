import { Module } from '@nestjs/common'

import { FacilityModule } from '../facility/facility.module'
import { PlaceModule } from '../place/place.module'
import { ReviewModule } from '../review/review.module'
import { RatingResolver } from './rating.resolver'
import { RatingService } from './rating.service'

@Module({
  imports: [PlaceModule, ReviewModule, FacilityModule],
  providers: [RatingResolver, RatingService],
  exports: [RatingService],
})
export class RatingModule {}
