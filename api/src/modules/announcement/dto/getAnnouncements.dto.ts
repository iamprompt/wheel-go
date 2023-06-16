import { Field, Float, InputType } from '@nestjs/graphql'

import { LocationInput } from '~/modules/object/dto/location.dto'

@InputType()
export class GetAnnouncementsInput {
  @Field(() => [String], { nullable: true })
  exclude?: string[]

  @Field(() => String, { nullable: true })
  keyword?: string

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput

  @Field(() => Float, { nullable: true })
  radius?: number

  @Field(() => Number, { nullable: true })
  limit?: number
}
