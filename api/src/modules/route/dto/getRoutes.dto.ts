import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetRoutesInput {
  @Field(() => [String], { nullable: true })
  exclude?: string[]

  @Field(() => String, { nullable: true })
  origin?: string

  @Field(() => String, { nullable: true })
  destination?: string

  @Field(() => Number, { nullable: true })
  limit?: number
}
