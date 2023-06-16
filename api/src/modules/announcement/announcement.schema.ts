import { Field, ID, ObjectType } from '@nestjs/graphql'

import { STATUS } from '~/const/status'
import { Media } from '../media/media.schema'
import { AnnouncementMetadata } from '../object/announcementMeta.schema'
import { LanguageObject } from '../object/language.schema'
import { Location } from '../object/location.schema'
import { Place } from '../place/place.schema'
import { User } from '../user/user.schema'

@ObjectType()
export class Announcement {
  @Field(() => ID!)
  id: string

  @Field(() => LanguageObject, { nullable: true })
  title: LanguageObject

  @Field(() => LanguageObject, { nullable: true })
  content: LanguageObject

  @Field(() => Place, { nullable: true })
  place: Place

  @Field(() => Location, { nullable: true })
  location: Location

  @Field(() => [Media], { nullable: true, defaultValue: [] })
  images: Media[]

  @Field(() => [String], { nullable: true, defaultValue: [] })
  tags: string[]

  @Field(() => AnnouncementMetadata, { nullable: true })
  metadata: AnnouncementMetadata

  @Field(() => User, { nullable: true })
  user: User

  @Field(() => STATUS, { defaultValue: STATUS.DRAFT })
  status: STATUS

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
