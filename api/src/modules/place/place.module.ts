import { Module } from '@nestjs/common'

import { WGMongoModule } from '~/database/WGMongo.module'
import { PlaceResolver } from './place.resolver'
import { PlaceService } from './place.service'

@Module({
  imports: [WGMongoModule],
  providers: [PlaceResolver, PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
