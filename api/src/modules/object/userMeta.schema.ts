import { Field, ObjectType } from '@nestjs/graphql'

import { FavoritePlace } from './favoritePlace.schema'

@ObjectType()
export class UserMetadata {
  @Field({ nullable: true })
  impairmentLevel?: string

  @Field({ nullable: true })
  equipment?: string

  @Field(() => [FavoritePlace], { nullable: true })
  favorites?: FavoritePlace[]
}
