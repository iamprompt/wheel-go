import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { ROLES } from '~/const/userRoles'
import { ActiveLang } from '~/decorators/activeLang.decorator'
import { CurrentUser } from '~/decorators/currentUser.decorator'
import { GqlOptionalAuthGuard } from '~/guards/GqlOptionalAuthGuard'
import { User } from '../user/user.schema'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { GetPlacesInput } from './dto/getPlaces.dto'
import { Place } from './place.schema'
import { PlaceService } from './place.service'

@Resolver()
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => [Place])
  @UseGuards(GqlOptionalAuthGuard)
  async getPlaces(
    @ActiveLang() lang: string,
    @Args('options', { nullable: true }) options?: GetPlacesInput,
    @CurrentUser() user?: User,
  ) {
    return this.placeService.find(options, lang, user?.role === ROLES.ADMIN)
  }

  @Query(() => Place)
  @UseGuards(GqlOptionalAuthGuard)
  async getPlaceById(
    @Args('id') id: string,
    @ActiveLang() lang: string,
    @CurrentUser() user?: User,
  ) {
    return this.placeService.findById(id, lang, user?.role === ROLES.ADMIN)
  }

  @Mutation(() => Place)
  async createPlace(
    @Args('data') data: CreatePlaceInput,
    @ActiveLang() lang: string,
  ) {
    return this.placeService.create(data, lang)
  }

  @Mutation(() => Place)
  async updatePlace(
    @Args('id') id: string,
    @Args('data') data: CreatePlaceInput,
    @ActiveLang() lang: string,
  ) {
    return this.placeService.update(id, data, lang)
  }

  @Mutation(() => Boolean)
  async deletePlace(@Args('id') id: string) {
    try {
      await this.placeService.delete(id)
      return true
    } catch (error) {
      throw new Error(error)
    }
  }
}
