import { Module } from '@nestjs/common'

import { WGMongoModule } from '~/database/WGMongo.module'
import { ActivityLogModule } from '../activityLog/activityLog.module'
import { BadgeResolver } from './badge.resolver'
import { BadgeService } from './badge.service'

@Module({
  imports: [WGMongoModule, ActivityLogModule],
  providers: [BadgeService, BadgeResolver],
  exports: [BadgeService],
})
export class BadgeModule {}
