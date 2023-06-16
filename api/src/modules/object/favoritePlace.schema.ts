import { Field, ObjectType } from '@nestjs/graphql'

import { Place } from '../place/place.schema'

@ObjectType()
export class FavoritePlace {
  @Field(() => Date, { nullable: true })
  addedAt: Date

  @Field(() => Place, { nullable: true })
  place: Place
}
