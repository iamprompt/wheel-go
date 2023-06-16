import { Field, ObjectType } from '@nestjs/graphql'

import { ACCESSIBILITY_STATUS } from '~/const/accessibilityStatus'

@ObjectType()
export class PlaceMetadata {
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
