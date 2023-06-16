import { Field, InputType } from '@nestjs/graphql'

import { ROLES } from '~/const/userRoles'
import { UserMetaInput } from '~/modules/object/dto/userMeta.dto'

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  profileImage?: string

  @Field({ nullable: true })
  firstname?: string

  @Field({ nullable: true })
  lastname?: string

  @Field({ nullable: true })
  username?: string

  @Field(() => ROLES, { nullable: true })
  role: ROLES

  @Field(() => UserMetaInput, { nullable: true })
  metadata?: UserMetaInput
}
