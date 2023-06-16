import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AnnouncementMetaInput {
  @Field({ nullable: true })
  line?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string
}
