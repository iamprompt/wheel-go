import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { ObjectId } from 'mongodb'
import type { Model } from 'mongoose'

import { ROUTE_TYPES } from '~/const/routeTypes'
import { STATUS } from '~/const/status'
import { GetRoutesInput } from '~/modules/route/dto/getRoutes.dto'
import type { RouteDocument } from './route.schema'
import { Route } from './route.schema'

@Injectable()
export class RouteRepository {
  constructor(
    @InjectModel(Route.name)
    private readonly RouteModel: Model<RouteDocument>,
  ) {}

  PopulateOptions: Parameters<(typeof this.RouteModel)['populate']>['0'] = [
    'origin',
    'destination',
  ]

  async find(options: GetRoutesInput, draft = true): Promise<RouteDocument[]> {
    let query = this.RouteModel.find({
      // Find reviews that match the origin object id and destination object id
      ...(options.origin || options.destination
        ? {
            $or: [
              {
                origin: new ObjectId(options.origin),
                destination: new ObjectId(options.destination),
              },
              {
                origin: new ObjectId(options.destination),
                destination: new ObjectId(options.origin),
              },
            ],
          }
        : {}),
      ...(options.exclude ? { _id: { $nin: options.exclude } } : {}),
    })
      .limit(options.limit || 1000)
      .populate(this.PopulateOptions)

    if (!draft) {
      query = query.where('status').equals(STATUS.PUBLISHED)
    }

    return query.sort({ createdAt: -1 }).exec()
  }

  async findById(id: string, draft = true): Promise<RouteDocument> {
    let query = this.RouteModel.findById(id).populate(this.PopulateOptions)

    if (!draft) {
      query = query.where('status').equals(STATUS.PUBLISHED)
    }

    return query.exec()
  }

  async findRoutesByUserId(
    userId: string,
    type: ROUTE_TYPES = ROUTE_TYPES.TRACED,
    draft = true,
  ): Promise<RouteDocument[]> {
    let query = this.RouteModel.find({
      user: new ObjectId(userId),
      type,
    }).populate(this.PopulateOptions)

    if (!draft) {
      query = query.where('status').equals(STATUS.PUBLISHED)
    }

    return query.sort({ createdAt: -1 }).exec()
  }

  async create(route: Route): Promise<RouteDocument> {
    const createdRoute = new this.RouteModel(route)
    return (await createdRoute.save()).populate(this.PopulateOptions)
  }

  async update(id: string, route: Route): Promise<RouteDocument> {
    const updatedRoute = await this.RouteModel.findByIdAndUpdate(id, route, {
      new: true,
    })

    if (!updatedRoute) {
      throw new Error('Route not found')
    }

    return updatedRoute.populate(this.PopulateOptions)
  }

  async delete(id: string): Promise<RouteDocument> {
    return this.RouteModel.findByIdAndDelete(id).exec()
  }

  async countByUserId(userId: string): Promise<number> {
    return this.RouteModel.countDocuments({ user: new ObjectId(userId) })
  }

  async sumDistanceByUserId(userId: string): Promise<number> {
    const routes = await this.RouteModel.find({
      user: new ObjectId(userId),
    }).exec()

    return routes.reduce((acc, curr) => acc + curr.distance || 0, 0)
  }
}
