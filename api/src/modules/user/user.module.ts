import { Module } from '@nestjs/common'

import { WGMongoModule } from '~/database/WGMongo.module'
import { ActivityLogModule } from '../activityLog/activityLog.module'
import { BadgeModule } from '../badge/badge.module'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [WGMongoModule, ActivityLogModule, BadgeModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
