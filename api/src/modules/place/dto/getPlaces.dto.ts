import { Field, Float, InputType } from '@nestjs/graphql'

import { PLACE_TYPES } from '~/const/placeTypes'
import { LocationInput } from '~/modules/object/dto/location.dto'

@InputType()
export class GetPlacesInput {
  @Field(() => [String], { nullable: true })
  exclude?: string[]

  @Field(() => String, { nullable: true })
  keyword?: string

  @Field(() => [PLACE_TYPES], { nullable: true })
  types?: PLACE_TYPES[]

  @Field(() => [PLACE_TYPES], { nullable: true })
  excludeTypes?: PLACE_TYPES[]

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput

  @Field(() => Float, { nullable: true })
  radius?: number

  @Field(() => Number, { nullable: true })
  limit?: number
}
