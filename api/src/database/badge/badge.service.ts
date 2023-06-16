import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'

import { Badge, BadgeDocument } from './badge.schema'

@Injectable()
export class BadgeRepository {
  constructor(
    @InjectModel(Badge.name)
    private readonly BadgeModel: Model<BadgeDocument>,
  ) {}

  async create(badge: Badge): Promise<BadgeDocument> {
    const createdBadge = new this.BadgeModel(badge)
    return await createdBadge.save()
  }

  async find(): Promise<BadgeDocument[]> {
    return this.BadgeModel.find().exec()
  }

  async findById(id: string): Promise<BadgeDocument> {
    return this.BadgeModel.findById(id).exec()
  }

  async update(id: string, badge: Badge): Promise<BadgeDocument> {
    const updatedBadge = await this.BadgeModel.findByIdAndUpdate(
      id,
      badge,
    ).exec()

    return updatedBadge
  }

  async delete(id: string): Promise<BadgeDocument> {
    const deletedBadge = await this.BadgeModel.findByIdAndDelete(id).exec()

    return deletedBadge
  }
}
