import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateActivityLogInput {
  @Field(() => String)
  action: string

  @Field(() => String, { nullable: true })
  route?: string

  @Field(() => String, { nullable: true })
  review?: string

  @Field(() => Number)
  point: number
}
