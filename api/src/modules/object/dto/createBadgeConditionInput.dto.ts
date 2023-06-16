import { Field, InputType } from '@nestjs/graphql'

import { LanguageObjectInput } from './language.dto'

@InputType()
export class CreateBadgeConditionInput {
  @Field(() => LanguageObjectInput, { nullable: true })
  name?: LanguageObjectInput

  @Field(() => LanguageObjectInput, { nullable: true })
  description?: LanguageObjectInput

  @Field(() => String, { nullable: true })
  icon?: string

  @Field(() => String, { nullable: true })
  color?: string

  @Field(() => String, { nullable: true })
  type?: string

  @Field(() => Number, { nullable: true })
  requiredCount?: number

  @Field(() => [String], { nullable: true })
  filter?: string[]
}
