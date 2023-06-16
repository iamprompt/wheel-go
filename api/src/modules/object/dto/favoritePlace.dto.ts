import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FavoritePlaceInput {
  @Field(() => Date, { nullable: true })
  addedAt?: Date

  @Field({ nullable: true })
  place?: string
}
