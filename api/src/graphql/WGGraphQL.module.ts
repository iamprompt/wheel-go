import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

import * as Modules from '~/modules'
import './enum'

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (_configService: ConfigService) => ({
        autoSchemaFile: 'schema.gql',
        playground: false,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault({
            embed: {
              runTelemetry: false,
              endpointIsEditable: false,
              initialState: {
                sharedHeaders: {
                  Authorization: 'Bearer {{accessToken}}',
                },
              },
            },
          }),
        ],
        context: ({ req }) => ({ req }),
        csrfPrevention: false,
      }),
    }),
    ...Object.values(Modules),
  ],
})
export class WGGraphQLModule {}
