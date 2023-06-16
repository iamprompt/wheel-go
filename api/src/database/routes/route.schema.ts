import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'

import { ROUTE_TYPES } from '~/const/routeTypes'
import { STATUS } from '~/const/status'
import type { Location } from '../object/LocationObject'
import { LocationObject } from '../object/LocationObject'
import { Place, PlaceDocument } from '../places/place.schema'
import { User, UserDocument } from '../users/user.schema'
import { Timestamp, TimestampConfig } from '../utils/timestamp'

@Schema({ collection: 'routes', timestamps: TimestampConfig })
export class Route {
  @Prop({
    type: String,
    enum: Object.values(ROUTE_TYPES),
    default: ROUTE_TYPES.TRACED,
  })
  type: ROUTE_TYPES

  @Prop({ type: [LocationObject] })
  paths: Location[]

  @Prop()
  internalCode: string

  @Prop({ type: Types.ObjectId, ref: Place.name })
  origin: PlaceDocument

  @Prop({ type: Types.ObjectId, ref: Place.name })
  destination: PlaceDocument

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: UserDocument

  @Prop()
  distance: number

  @Prop()
  duration: number

  @Prop({
    type: String,
    enum: Object.values(STATUS),
    default: STATUS.DRAFT,
  })
  status: string
}

export type RouteDocument = HydratedDocument<Route, Timestamp>
export const RouteSchema = SchemaFactory.createForClass(Route)
