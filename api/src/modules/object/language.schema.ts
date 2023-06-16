import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LanguageObject {
  @Field({ nullable: true })
  th?: string

  @Field({ nullable: true })
  en?: string
}
