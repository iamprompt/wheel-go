import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FacilityMetadata {
  @Field(() => Number, { nullable: true })
  length: number

  @Field(() => Number, { nullable: true })
  rise: number
}
