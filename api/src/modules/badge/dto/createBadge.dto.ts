import { Field, InputType } from '@nestjs/graphql'

import { CreateBadgeConditionInput } from '~/modules/object/dto/createBadgeConditionInput.dto'
import { LanguageObjectInput } from '~/modules/object/dto/language.dto'

@InputType()
export class CreateBadgeInput {
  @Field(() => LanguageObjectInput)
  name: LanguageObjectInput

  @Field(() => LanguageObjectInput)
  description: LanguageObjectInput

  @Field(() => String, { nullable: true })
  icon: string

  @Field(() => String, { nullable: true })
  color: string

  @Field(() => [CreateBadgeConditionInput], { nullable: true })
  conditions: CreateBadgeConditionInput[]
}
