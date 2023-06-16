import { Field, ID, ObjectType } from '@nestjs/graphql'

import { ROUTE_TYPES } from '~/const/routeTypes'
import { STATUS } from '~/const/status'
import { Location } from '../object/location.schema'
import { Place } from '../place/place.schema'
import { User } from '../user/user.schema'

@ObjectType()
export class Route {
  @Field(() => ID!)
  id: string

  @Field(() => ROUTE_TYPES, { nullable: true })
  type: ROUTE_TYPES

  @Field(() => [Location], { nullable: true })
  paths: Location[]

  @Field({ nullable: true })
  internalCode: string

  @Field({ nullable: true })
  origin: Place

  @Field({ nullable: true })
  destination: Place

  @Field(() => User, { nullable: true })
  user: User

  @Field(() => Number, { nullable: true })
  distance: number

  @Field(() => Number, { nullable: true })
  duration: number

  @Field(() => STATUS, { nullable: true })
  status: STATUS

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
