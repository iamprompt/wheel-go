import { Field, Float, InputType } from '@nestjs/graphql'

import { FACILITY_TYPES } from '~/const/facilityTypes'
import { LocationInput } from '~/modules/object/dto/location.dto'

@InputType()
export class GetFacilitiesInput {
  @Field(() => [String], { nullable: true })
  exclude?: string[]

  @Field(() => String, { nullable: true })
  keyword?: string

  @Field(() => [FACILITY_TYPES], { nullable: true })
  types?: FACILITY_TYPES[]

  @Field(() => [FACILITY_TYPES], { nullable: true })
  excludeTypes?: FACILITY_TYPES[]

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput

  @Field(() => Float, { nullable: true })
  radius?: number

  @Field(() => Number, { nullable: true })
  limit?: number
}
