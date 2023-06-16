import { Injectable } from '@nestjs/common'

import { ActivityType } from '~/const/activityLog'
import { ROUTE_TYPES } from '~/const/routeTypes'
import { RouteRepository } from '~/database/routes/route.service'
import { ActivityLogService } from '../activityLog/activityLog.service'
import { CreateRouteInput } from './dto/createRoute.dto'
import { GetRoutesInput } from './dto/getRoutes.dto'
import { RouteFactory } from './route.factory'

@Injectable()
export class RouteService {
  constructor(
    private readonly routeRepository: RouteRepository,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async find(options: GetRoutesInput = {}, lang = 'th') {
    const routes = await this.routeRepository.find(options)
    return RouteFactory.createFromDatabase(routes, lang)
  }

  async findById(id: string, lang = 'th') {
    const route = await this.routeRepository.findById(id)
    return RouteFactory.createFromDatabase(route, lang)
  }

  async findMyTracedRoutes(userId: string, lang = 'th') {
    const routes = await this.routeRepository.findRoutesByUserId(
      userId,
      ROUTE_TYPES.TRACED,
    )
    return RouteFactory.createFromDatabase(routes, lang)
  }

  async create(route: CreateRouteInput, userId?: string, lang = 'th') {
    const routeToSave = RouteFactory.createToSave({
      ...route,
      user: route.user ? route.user : userId || undefined,
    })
    const result = await this.routeRepository.create(routeToSave)
    const formattedRoute = RouteFactory.createFromDatabase(result, lang)

    await this.activityLogService.create(
      {
        action: ActivityType.TRACE_ROUTE,
        route: formattedRoute.id,
        point: 100,
      },
      formattedRoute.user.id,
    )

    return formattedRoute
  }

  async update(id: string, route: CreateRouteInput, lang = 'th') {
    const routeToSave = RouteFactory.createToSave(route)
    const result = await this.routeRepository.update(id, routeToSave)
    return RouteFactory.createFromDatabase(result, lang)
  }

  async delete(id: string) {
    return this.routeRepository.delete(id)
  }
}
