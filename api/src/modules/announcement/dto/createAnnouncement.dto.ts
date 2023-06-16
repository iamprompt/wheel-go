import { Field, InputType } from '@nestjs/graphql'

import { STATUS } from '~/const/status'
import { AnnouncementMetaInput } from '~/modules/object/dto/announcementMeta.dto'
import { LanguageObjectInput } from '~/modules/object/dto/language.dto'
import { LocationInput } from '~/modules/object/dto/location.dto'

@InputType()
export class CreateAnnouncementInput {
  @Field(() => LanguageObjectInput, { nullable: true })
  title?: LanguageObjectInput

  @Field(() => LanguageObjectInput, { nullable: true })
  content?: LanguageObjectInput

  @Field(() => String, { nullable: true })
  place?: string

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput

  @Field(() => [String], { nullable: true, defaultValue: [] })
  images?: string[]

  @Field(() => [String], { nullable: true, defaultValue: [] })
  tags?: string[]

  @Field(() => AnnouncementMetaInput, { nullable: true })
  metadata?: AnnouncementMetaInput

  @Field(() => String, { nullable: true })
  user?: string

  @Field(() => STATUS, { nullable: true })
  status?: STATUS
}
