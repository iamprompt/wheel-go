import { Field, Float, ObjectType } from '@nestjs/graphql'

import { FACILITY_STATUS } from '~/const/facilityStatus'

@ObjectType()
export class FacilityAvailability {
  @Field(() => FACILITY_STATUS, { defaultValue: FACILITY_STATUS.UNKNOWN })
  status: FACILITY_STATUS

  @Field(() => Float)
  rating: number
}

@ObjectType()
export class FacilitiesAvailability {
  @Field(() => FacilityAvailability, { nullable: true })
  RAMP?: FacilityAvailability

  @Field(() => FacilityAvailability, { nullable: true })
  ASSISTANCE?: FacilityAvailability

  @Field(() => FacilityAvailability, { nullable: true })
  TOILET?: FacilityAvailability

  @Field(() => FacilityAvailability, { nullable: true })
  ELEVATOR?: FacilityAvailability

  @Field(() => FacilityAvailability, { nullable: true })
  PARKING?: FacilityAvailability

  @Field(() => FacilityAvailability, { nullable: true })
  SURFACE?: FacilityAvailability
}
