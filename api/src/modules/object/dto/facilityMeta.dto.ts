import { Field, Float, InputType } from '@nestjs/graphql'

@InputType()
export class FacilityMetaInput {
  @Field(() => Float, { nullable: true })
  length?: number

  @Field(() => Float, { nullable: true })
  rise?: number
}
