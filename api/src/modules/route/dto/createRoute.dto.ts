import { Field, Float, InputType } from '@nestjs/graphql'

import { ROUTE_TYPES } from '~/const/routeTypes'
import { STATUS } from '~/const/status'
import { LocationInput } from '~/modules/object/dto/location.dto'

@InputType()
export class CreateRouteInput {
  @Field(() => ROUTE_TYPES, { nullable: true })
  type?: ROUTE_TYPES

  @Field(() => [LocationInput], { nullable: true })
  paths?: LocationInput[]

  @Field(() => String, { nullable: true })
  internalCode?: string

  @Field(() => String, { nullable: true })
  origin?: string

  @Field(() => String, { nullable: true })
  destination?: string

  @Field(() => String, { nullable: true })
  user?: string

  @Field(() => Float, { nullable: true })
  distance?: number

  @Field(() => Float, { nullable: true })
  duration?: number

  @Field(() => STATUS, { nullable: true })
  status?: STATUS
}
