import { Field, ID, ObjectType } from '@nestjs/graphql'

import { ROLES } from '~/const/userRoles'
import { Media } from '../media/media.schema'
import { UserBadge } from '../object/userBadge.schema'
import { UserMetadata } from '../object/userMeta.schema'

@ObjectType()
export class User {
  @Field(() => ID!)
  id: string

  @Field(() => Media, { nullable: true })
  profileImage: Media

  @Field({ nullable: true })
  firstname: string

  @Field({ nullable: true })
  lastname: string

  @Field({ nullable: true })
  username: string

  @Field(() => ROLES, { nullable: true })
  role: ROLES

  @Field({ nullable: true })
  email: string

  @Field(() => UserMetadata, { nullable: true })
  metadata: UserMetadata

  @Field(() => [UserBadge], { nullable: true, defaultValue: [] })
  badges: UserBadge[]

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
