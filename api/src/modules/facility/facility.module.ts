import { Module } from '@nestjs/common'

import { WGMongoModule } from '~/database/WGMongo.module'
import { FacilityResolver } from './facility.resolver'
import { FacilityService } from './facility.service'

@Module({
  imports: [WGMongoModule],
  providers: [FacilityResolver, FacilityService],
  exports: [FacilityService],
})
export class FacilityModule {}
