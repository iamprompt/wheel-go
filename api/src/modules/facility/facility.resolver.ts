import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { ActiveLang } from '~/decorators/activeLang.decorator'
import { CreateFacilityInput } from './dto/createFacility.dto'
import { GetFacilitiesInput } from './dto/getFacilities.dto'
import { Facility } from './facility.schema'
import { FacilityService } from './facility.service'

@Resolver()
export class FacilityResolver {
  constructor(private readonly facilityService: FacilityService) {}

  @Query(() => [Facility])
  async getFacilities(
    @ActiveLang() lang: string,
    @Args('options', { nullable: true }) options?: GetFacilitiesInput,
  ) {
    return await this.facilityService.find(options, lang)
  }

  @Query(() => Facility)
  async getFacilityById(
    @Args('id') id: string,
    @ActiveLang() lang: string,
  ): Promise<Facility> {
    return await this.facilityService.findById(id, lang)
  }

  @Query(() => [Facility])
  async getFacilitiesByPlaceId(
    @Args('placeId') placeId: string,
    @ActiveLang() lang: string,
  ) {
    return await this.facilityService.findByPlaceId(placeId, lang)
  }

  @Mutation(() => Facility)
  async createFacility(
    @Args('data') data: CreateFacilityInput,
    @ActiveLang() lang: string,
  ) {
    return await this.facilityService.create(data, lang)
  }

  @Mutation(() => Facility)
  async updateFacility(
    @Args('id') id: string,
    @Args('data') data: CreateFacilityInput,
    @ActiveLang() lang: string,
  ) {
    return await this.facilityService.update(id, data, lang)
  }

  @Mutation(() => Boolean)
  async deleteFacility(@Args('id') id: string) {
    try {
      await this.facilityService.delete(id)
      return true
    } catch (error) {
      throw new Error(error)
    }
  }
}
