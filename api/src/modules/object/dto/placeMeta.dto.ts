import { Field, InputType } from '@nestjs/graphql'

import { ACCESSIBILITY_STATUS } from '~/const/accessibilityStatus'

@InputType()
export class PlaceMetaInput {
  @Field({ nullable: true })
  website?: string

  @Field({ nullable: true })
  phone?: string

  @Field(() => [String], { nullable: true })
  busLines?: string[]

  @Field(() => [String], { nullable: true })
  tramLines?: string[]

  @Field(() => ACCESSIBILITY_STATUS, { nullable: true })
  accessibility?: ACCESSIBILITY_STATUS
}
