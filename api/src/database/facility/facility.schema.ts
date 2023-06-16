import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'

import { CONCERN_TYPES } from '~/const/concernTypes'
import { FACILITY_TYPES } from '~/const/facilityTypes'
import { STATUS } from '~/const/status'
import type { FacilityMetadata } from '../object/FacilityMetadataObject'
import { FacilityMetadataObject } from '../object/FacilityMetadataObject'
import type { LangObject } from '../object/LangObject'
import { LangObjectDefinition } from '../object/LangObject'
import type { Location } from '../object/LocationObject'
import { LocationObject } from '../object/LocationObject'
import { Place, PlaceDocument } from '../places/place.schema'
import { Timestamp, TimestampConfig } from '../utils/timestamp'

@Schema({ collection: 'facilities', timestamps: TimestampConfig })
export class Facility {
  @Prop({ type: Types.ObjectId, ref: Place.name })
  parent: PlaceDocument

  @Prop({
    type: String,
    enum: Object.values(FACILITY_TYPES),
  })
  type: FACILITY_TYPES

  @Prop({ type: LangObjectDefinition })
  detail: LangObject

  @Prop(LocationObject)
  location: Location

  @Prop({ type: FacilityMetadataObject })
  metadata: FacilityMetadata

  @Prop({
    type: String,
    enum: Object.values(CONCERN_TYPES),
  })
  concern: CONCERN_TYPES

  @Prop({ type: Boolean, default: false })
  isWarning: boolean

  @Prop({
    type: String,
    default: STATUS.DRAFT,
    enum: Object.values(STATUS),
  })
  status: string
}

export type FacilityDocument = HydratedDocument<Facility, Timestamp>
export const FacilitySchema = SchemaFactory.createForClass(Facility)

FacilitySchema.index({ location: '2dsphere' })
