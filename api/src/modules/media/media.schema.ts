import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Media {
  @Field(() => ID!)
  id: string

  @Field({ nullable: true })
  filename: string

  @Field({ nullable: true })
  mimetype: string

  @Field({ nullable: true })
  filesize: number

  @Field({ nullable: true })
  width: number

  @Field({ nullable: true })
  height: number

  @Field({ nullable: true })
  url: string

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
