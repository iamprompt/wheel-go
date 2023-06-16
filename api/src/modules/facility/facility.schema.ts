import { Field, ID, ObjectType } from '@nestjs/graphql'

import { CONCERN_TYPES } from '~/const/concernTypes'
import { FACILITY_TYPES } from '~/const/facilityTypes'
import { STATUS } from '~/const/status'
import { FacilityMetadata } from '../object/facilityMeta.schema'
import { LanguageObject } from '../object/language.schema'
import { Location } from '../object/location.schema'
import { Place } from '../place/place.schema'

@ObjectType()
export class Facility {
  @Field(() => ID!)
  id: string

  @Field(() => FACILITY_TYPES, { nullable: true })
  type?: FACILITY_TYPES

  @Field(() => Place, { nullable: true })
  parent?: Place

  @Field(() => LanguageObject, { nullable: true })
  detail?: LanguageObject

  @Field(() => Location, { nullable: true })
  location?: Location

  @Field(() => CONCERN_TYPES, { nullable: true })
  concern?: CONCERN_TYPES

  @Field(() => Boolean, { nullable: true })
  isWarning?: boolean

  @Field(() => FacilityMetadata, { nullable: true })
  metadata?: FacilityMetadata

  @Field(() => STATUS, { nullable: true })
  status?: STATUS

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
