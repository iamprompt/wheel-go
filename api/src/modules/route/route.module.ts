import { Module } from '@nestjs/common'

import { WGMongoModule } from '~/database/WGMongo.module'
import { ActivityLogModule } from '../activityLog/activityLog.module'
import { RouteResolver } from './route.resolver'
import { RouteService } from './route.service'

@Module({
  imports: [WGMongoModule, ActivityLogModule],
  providers: [RouteResolver, RouteService],
})
export class RouteModule {}
