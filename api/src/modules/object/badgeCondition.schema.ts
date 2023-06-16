import { Field, ObjectType } from '@nestjs/graphql'

import { LanguageObject } from './language.schema'

@ObjectType()
export class BadgeCondition {
  @Field(() => LanguageObject, { nullable: true })
  name: LanguageObject

  @Field(() => LanguageObject, { nullable: true })
  description: LanguageObject

  @Field(() => String, { nullable: true })
  icon: string

  @Field(() => String, { nullable: true })
  color: string

  @Field(() => String, { nullable: true })
  type: string

  @Field(() => Number, { nullable: true })
  requiredCount: number

  @Field(() => [String], { nullable: true })
  filter: string[]
}
