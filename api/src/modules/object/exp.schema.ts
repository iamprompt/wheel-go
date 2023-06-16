import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ExperiencePoint {
  @Field(() => Number)
  level: number

  @Field(() => Number)
  point: number

  @Field(() => Number)
  nextLevelPoint: number
}
