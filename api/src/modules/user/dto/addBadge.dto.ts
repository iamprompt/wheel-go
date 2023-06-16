import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddBadgeInput {
  @Field(() => String)
  badge: string
}
