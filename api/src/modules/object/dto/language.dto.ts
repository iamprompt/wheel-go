import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LanguageObjectInput {
  @Field({ nullable: true })
  th?: string

  @Field({ nullable: true })
  en?: string
}
