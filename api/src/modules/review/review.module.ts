import { Module } from '@nestjs/common'

import { WGMongoModule } from '~/database/WGMongo.module'
import { ActivityLogModule } from '../activityLog/activityLog.module'
import { ReviewResolver } from './review.resolver'
import { ReviewService } from './review.service'

@Module({
  imports: [WGMongoModule, ActivityLogModule],
  providers: [ReviewResolver, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
