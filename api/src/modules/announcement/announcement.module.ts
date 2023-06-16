import { Module } from '@nestjs/common'

import { WGMongoModule } from '~/database/WGMongo.module'
import { AnnouncementResolver } from './announcement.resolver'
import { AnnouncementService } from './announcement.service'

@Module({
  imports: [WGMongoModule],
  providers: [AnnouncementResolver, AnnouncementService],
})
export class AnnouncementModule {}
