import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { ActiveLang } from '~/decorators/activeLang.decorator'
import { CurrentUser } from '~/decorators/currentUser.decorator'
import { GqlAuthGuard } from '~/guards/GqlAuthGuard'
import { User } from '../user/user.schema'
import { CreateRouteInput } from './dto/createRoute.dto'
import { GetRoutesInput } from './dto/getRoutes.dto'
import { Route } from './route.schema'
import { RouteService } from './route.service'

@Resolver()
export class RouteResolver {
  constructor(private readonly routeService: RouteService) {}

  @Query(() => [Route])
  async getRoutes(
    @ActiveLang() lang: string,
    @Args('options', { nullable: true }) options?: GetRoutesInput,
  ): Promise<Route[]> {
    return this.routeService.find(options, lang)
  }

  @Query(() => Route)
  async getRouteById(
    @Args('id') id: string,
    @ActiveLang() lang: string,
  ): Promise<Route> {
    const route = await this.routeService.findById(id, lang)
    return route
  }

  @Query(() => [Route])
  @UseGuards(GqlAuthGuard)
  async getMyTracedRoutes(
    @ActiveLang() lang: string,
    @CurrentUser() user: User,
  ): Promise<Route[]> {
    const routes = await this.routeService.findMyTracedRoutes(user.id, lang)
    return routes
  }

  @Mutation(() => Route)
  @UseGuards(GqlAuthGuard)
  async createRoute(
    @Args('data') data: CreateRouteInput,
    @ActiveLang() lang: string,
    @CurrentUser() user: User,
  ): Promise<Route> {
    return this.routeService.create(data, user.id, lang)
  }

  @Mutation(() => Route)
  async updateRoute(
    @Args('id') id: string,
    @Args('data') data: CreateRouteInput,
    @ActiveLang() lang: string,
  ): Promise<Route> {
    return this.routeService.update(id, data, lang)
  }

  @Mutation(() => Boolean)
  async deleteRoute(@Args('id') id: string): Promise<boolean> {
    try {
      await this.routeService.delete(id)
      return true
    } catch (error) {
      throw new Error(error)
    }
    return
  }
}
