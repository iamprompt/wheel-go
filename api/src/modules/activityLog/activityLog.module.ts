import { Module } from '@nestjs/common'

import { WGMongoModule } from '~/database/WGMongo.module'
import { ActivityLogService } from './activityLog.service'

@Module({
  imports: [WGMongoModule],
  providers: [ActivityLogService],
  exports: [ActivityLogService],
})
export class ActivityLogModule {}
