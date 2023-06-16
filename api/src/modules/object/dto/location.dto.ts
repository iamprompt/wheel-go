import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LocationInput {
  @Field({ nullable: true })
  lat: string

  @Field({ nullable: true })
  lng: string
}
