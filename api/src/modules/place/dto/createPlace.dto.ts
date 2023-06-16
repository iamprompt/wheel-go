import { Field, InputType } from '@nestjs/graphql'

import { PLACE_TYPES } from '~/const/placeTypes'
import { STATUS } from '~/const/status'
import { LanguageObjectInput } from '~/modules/object/dto/language.dto'
import { LocationInput } from '~/modules/object/dto/location.dto'
import { PlaceMetaInput } from '~/modules/object/dto/placeMeta.dto'

@InputType()
export class CreatePlaceInput {
  @Field(() => PLACE_TYPES, { nullable: true })
  type?: PLACE_TYPES

  @Field(() => LanguageObjectInput, { nullable: true })
  name?: LanguageObjectInput

  @Field(() => LanguageObjectInput, { nullable: true })
  address?: LanguageObjectInput

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput

  @Field(() => [String], { nullable: true })
  images?: string[]

  @Field(() => String, { nullable: true })
  internalCode?: string

  @Field(() => PlaceMetaInput, { nullable: true })
  metadata?: PlaceMetaInput

  @Field(() => STATUS, { nullable: true, defaultValue: STATUS.DRAFT })
  status?: STATUS
}
