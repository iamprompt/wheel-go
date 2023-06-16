import { Module } from '@nestjs/common'

import { WGMongoModule } from '~/database/WGMongo.module'
import { MediaResolver } from './media.resolver'
import { MediaService } from './media.service'

@Module({
  imports: [WGMongoModule],
  providers: [MediaResolver, MediaService],
})
export class MediaModule {}
