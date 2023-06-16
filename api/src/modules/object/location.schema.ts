import { Field, Float, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Location {
  @Field(() => Float)
  lat: number

  @Field(() => Float)
  lng: number
}
