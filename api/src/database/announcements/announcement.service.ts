import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import type { Model } from 'mongoose'

import { STATUS } from '~/const/status'
import { GetAnnouncementsInput } from '~/modules/announcement/dto/getAnnouncements.dto'
import type { AnnouncementDocument } from './announcement.schema'
import { Announcement } from './announcement.schema'

@Injectable()
export class AnnouncementRepository {
  constructor(
    @InjectModel(Announcement.name)
    private readonly AnnouncementModel: Model<AnnouncementDocument>,
  ) {}

  populateOptions: Parameters<
    (typeof this.AnnouncementModel)['populate']
  >['0'] = ['user', 'place', 'images']

  async find(
    options: GetAnnouncementsInput = {},
    draft = false,
  ): Promise<AnnouncementDocument[]> {
    let query = this.AnnouncementModel.find({
      ...(options.keyword
        ? {
            $or: [
              { 'title.th': { $regex: options.keyword, $options: 'i' } },
              { 'title.en': { $regex: options.keyword, $options: 'i' } },
              { 'content.en': { $regex: options.keyword, $options: 'i' } },
              { 'content.en': { $regex: options.keyword, $options: 'i' } },
            ],
          }
        : {}),
      ...(options.tags ? { type: { $in: options.tags } } : {}),
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
    })
      .limit(options.limit || 1000)
      .populate(this.populateOptions)

    if (!draft) {
      query = query.where('status').equals(STATUS.PUBLISHED)
    }

    return query.sort({ createdAt: -1 }).exec()
  }

  async findById(id: string, draft = false): Promise<AnnouncementDocument> {
    let query = this.AnnouncementModel.findById(id).populate(
      this.populateOptions,
    )

    if (!draft) {
      query = query.where('status').equals(STATUS.PUBLISHED)
    }

    return query.exec()
  }

  async create(announcement: Announcement): Promise<AnnouncementDocument> {
    const createdAnnouncement = new this.AnnouncementModel(announcement)
    const saveResult = await createdAnnouncement.save()

    return saveResult.populate(['user', 'place', 'images'])
  }

  async update(
    id: string,
    announcement: Announcement,
  ): Promise<AnnouncementDocument> {
    const updatedAnnouncement = await this.AnnouncementModel.findByIdAndUpdate(
      id,
      announcement,
      { new: true },
    )

    return updatedAnnouncement.populate(['user', 'place', 'images'])
  }

  async delete(id: string): Promise<AnnouncementDocument> {
    return this.AnnouncementModel.findByIdAndDelete(id)
  }
}
