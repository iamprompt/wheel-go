import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import type { Model } from 'mongoose'

import { STATUS } from '~/const/status'
import { GetPlacesInput } from '~/modules/place/dto/getPlaces.dto'
import type { PlaceDocument } from './place.schema'
import { Place } from './place.schema'

@Injectable()
export class PlaceRepository {
  constructor(
    @InjectModel(Place.name) private readonly PlaceModel: Model<PlaceDocument>,
  ) {}

  populateOptions: Parameters<(typeof this.PlaceModel)['populate']>['0'] = [
    {
      path: 'images',
    },
  ]

  async find(
    options: GetPlacesInput = {},
    draft = false,
  ): Promise<PlaceDocument[]> {
    let query = this.PlaceModel.find({
      ...(options.keyword
        ? {
            $or: [
              { 'name.th': { $regex: options.keyword, $options: 'i' } },
              { 'name.en': { $regex: options.keyword, $options: 'i' } },
            ],
          }
        : {}),
      ...(options.types ? { type: { $in: options.types } } : {}),
      ...(options.exclude ? { _id: { $nin: options.exclude } } : {}),
      ...(options.location
        ? {
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [options.location.lng, options.location.lat],
                },
                $maxDistance: options.radius || 10000,
                $minDistance: 0,
              },
            },
          }
        : {}),
      ...(options.excludeTypes ? { type: { $nin: options.excludeTypes } } : {}),
    })
      .limit(options.limit || 1000)
      .populate(this.populateOptions)

    if (!draft) {
      query = query.where('status').equals(STATUS.PUBLISHED)
    }

    return query.exec()
  }

  async findById(id: string, draft = false): Promise<PlaceDocument | null> {
    if (!id) {
      throw new Error('Place not found')
    }

    let query = this.PlaceModel.findById(id).populate(this.populateOptions)

    if (!draft) {
      query = query.where('status').equals(STATUS.PUBLISHED)
    }

    return query.exec()
  }

  async create(data: Place): Promise<PlaceDocument> {
    const createdPlace = new this.PlaceModel<Place>(data)
    return (await createdPlace.save()).populate(this.populateOptions)
  }

  async update(id: string, data: Place): Promise<PlaceDocument> {
    const updatedPlace = await this.PlaceModel.findByIdAndUpdate(id, data, {
      new: true,
    })

    if (!updatedPlace) {
      throw new Error('Place not found')
    }

    return updatedPlace.populate(this.populateOptions)
  }

  async delete(id: string): Promise<PlaceDocument> {
    const deletedPlace = await this.PlaceModel.findByIdAndDelete(id)

    if (!deletedPlace) {
      throw new Error('Place not found')
    }

    return deletedPlace.populate(this.populateOptions)
  }
}
