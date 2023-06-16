import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import type { Config } from '~/config/configuration'
import { WGConfigModule } from '~/config/WGConfig.module'
import {
  ActivityLog,
  ActivityLogSchema,
} from './activityLogs/activityLog.schema'
import {
  Announcement,
  AnnouncementSchema,
} from './announcements/announcement.schema'
import { Badge, BadgeSchema } from './badge/badge.schema'
import { Facility, FacilitySchema } from './facility/facility.schema'
import { Media, MediaSchema } from './media/media.schema'
import * as WGRepository from './mongo.service'
import { Place, PlaceSchema } from './places/place.schema'
import { Review, ReviewSchema } from './reviews/review.schema'
import { Route, RouteSchema } from './routes/route.schema'
import { User, UserSchema } from './users/user.schema'

@Module({
  imports: [
    WGConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<Config['MONGO_URI']>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Place.name, schema: PlaceSchema },
      { name: User.name, schema: UserSchema },
      { name: Media.name, schema: MediaSchema },
      { name: Facility.name, schema: FacilitySchema },
      { name: Announcement.name, schema: AnnouncementSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Route.name, schema: RouteSchema },
      { name: ActivityLog.name, schema: ActivityLogSchema },
      { name: Badge.name, schema: BadgeSchema },
    ]),
  ],
  providers: [...Object.values(WGRepository)],
  exports: [...Object.values(WGRepository)],
})
export class WGMongoModule {}
