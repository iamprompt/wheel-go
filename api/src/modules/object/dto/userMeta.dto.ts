import { Field, InputType } from '@nestjs/graphql'

import { FavoritePlaceInput } from './favoritePlace.dto'

@InputType()
export class UserMetaInput {
  @Field({ nullable: true })
  impairmentLevel: string

  @Field({ nullable: true })
  equipment: string

  @Field(() => [FavoritePlaceInput], { nullable: true })
  favorites: FavoritePlaceInput[]
}
