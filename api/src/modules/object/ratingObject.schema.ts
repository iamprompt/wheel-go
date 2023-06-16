import { Field, Float, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RatingObject {
  @Field(() => Float, { nullable: true })
  overall: number

  @Field(() => Float, { nullable: true })
  ramp: number

  @Field(() => Float, { nullable: true })
  assistance: number

  @Field(() => Float, { nullable: true })
  elevator: number

  @Field(() => Float, { nullable: true })
  parking: number

  @Field(() => Float, { nullable: true })
  surface: number

  @Field(() => Float, { nullable: true })
  toilet: number
}
