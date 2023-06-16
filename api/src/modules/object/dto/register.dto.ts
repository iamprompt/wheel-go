import { Field, InputType } from '@nestjs/graphql'

import { UserMetaInput } from './userMeta.dto'

@InputType()
export class RegisterInput {
  @Field()
  email: string

  @Field()
  password: string

  @Field()
  firstname: string

  @Field()
  lastname: string

  @Field()
  username: string

  @Field(() => UserMetaInput, { nullable: true })
  metadata?: UserMetaInput
}
