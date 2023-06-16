import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AnnouncementMetadata {
  @Field({ nullable: true })
  line?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string
}
