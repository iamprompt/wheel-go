import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'

import { WGConfigModule } from './config/WGConfig.module'
import { WGMongoModule } from './database/WGMongo.module'
import { WGGraphQLModule } from './graphql/WGGraphQL.module'

@Module({
  imports: [
    WGGraphQLModule,
    WGConfigModule,
    WGMongoModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
