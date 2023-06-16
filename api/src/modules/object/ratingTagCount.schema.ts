import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RatingTagCount {
  @Field()
  tag: string

  @Field()
  count: number
}
