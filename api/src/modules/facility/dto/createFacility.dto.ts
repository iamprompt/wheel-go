import { Field, InputType } from '@nestjs/graphql'

import { CONCERN_TYPES } from '~/const/concernTypes'
import { FACILITY_TYPES } from '~/const/facilityTypes'
import { STATUS } from '~/const/status'
import { FacilityMetaInput } from '~/modules/object/dto/facilityMeta.dto'
import { LanguageObjectInput } from '~/modules/object/dto/language.dto'
import { LocationInput } from '~/modules/object/dto/location.dto'

@InputType()
export class CreateFacilityInput {
  @Field(() => FACILITY_TYPES, { nullable: true })
  type?: FACILITY_TYPES

  @Field()
  parent?: string

  @Field(() => LanguageObjectInput, { nullable: true })
  detail?: LanguageObjectInput

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput

  @Field(() => FacilityMetaInput, { nullable: true })
  metadata?: FacilityMetaInput

  @Field(() => CONCERN_TYPES, { nullable: true })
  concern?: CONCERN_TYPES

  @Field(() => Boolean, { nullable: true })
  isWarning?: boolean

  @Field(() => STATUS, { nullable: true, defaultValue: STATUS.DRAFT })
  status?: STATUS
}
