import { Field, ID, ObjectType } from '@nestjs/graphql'

import { PLACE_TYPES } from '~/const/placeTypes'
import { STATUS } from '~/const/status'
import { Media } from '../media/media.schema'
import { LanguageObject } from '../object/language.schema'
import { Location } from '../object/location.schema'
import { PlaceMetadata } from '../object/placeMeta.schema'

@ObjectType()
export class Place {
  @Field(() => ID!)
  id: string

  @Field(() => PLACE_TYPES, { nullable: true })
  type?: PLACE_TYPES

  @Field(() => LanguageObject, { nullable: true })
  name?: LanguageObject

  @Field(() => LanguageObject, { nullable: true })
  address?: LanguageObject

  @Field(() => Location, { nullable: true })
  location?: Location

  @Field(() => [Media], { nullable: true })
  images?: Media[]

  @Field({ nullable: true })
  internalCode?: string

  @Field({ nullable: true })
  rating?: number

  @Field(() => PlaceMetadata, { nullable: true })
  metadata?: PlaceMetadata

  @Field(() => STATUS, { nullable: true })
  status?: STATUS

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
