import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { ObjectId } from 'mongodb'
import type { Model } from 'mongoose'

import { GetFacilitiesInput } from '~/modules/facility/dto/getFacilities.dto'
import type { FacilityDocument } from './facility.schema'
import { Facility } from './facility.schema'

@Injectable()
export class FacilityRepository {
  constructor(
    @InjectModel(Facility.name)
    private readonly FacilityModel: Model<FacilityDocument>,
  ) {}

  FacilityPopulateOptions: Parameters<
    (typeof this.FacilityModel)['populate']
  >['0'] = [
    {
      path: 'parent',
      populate: {
        path: 'images',
      },
    },
  ]

  async find(options: GetFacilitiesInput = {}): Promise<FacilityDocument[]> {
    return await this.FacilityModel.find({
      ...(options.keyword
        ? {
            $or: [
              { 'detail.th': { $regex: options.keyword, $options: 'i' } },
              { 'detail.en': { $regex: options.keyword, $options: 'i' } },
            ],
          }
        : {}),
      ...(options.types ? { type: { $in: options.types } } : {}),
      ...(options.exclude ? { _id: { $nin: options.exclude } } : {}),
      ...(options.excludeTypes ? { type: { $nin: options.excludeTypes } } : {}),
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
    })
      .limit(options.limit || 1000)
      .populate(this.FacilityPopulateOptions)
      .exec()
  }

  async findById(id: string): Promise<FacilityDocument> {
    return this.FacilityModel.findById(id)
      .populate(this.FacilityPopulateOptions)
      .exec()
  }

  async findByParentId(parentId: string): Promise<FacilityDocument[]> {
    return this.FacilityModel.find({ parent: new ObjectId(parentId) })
      .populate(this.FacilityPopulateOptions)
      .exec()
  }

  async create(data: Facility): Promise<FacilityDocument> {
    const facility = new this.FacilityModel(data)
    const saveResult = await facility.save()
    return saveResult.populate(this.FacilityPopulateOptions)
  }

  async update(id: string, data: Facility): Promise<FacilityDocument> {
    const updatedFacility = await this.FacilityModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    )
    return updatedFacility.populate(this.FacilityPopulateOptions)
  }

  async delete(id: string): Promise<FacilityDocument> {
    const deletedFacility = await this.FacilityModel.findByIdAndDelete(id)
    return deletedFacility.populate(this.FacilityPopulateOptions)
  }
}
