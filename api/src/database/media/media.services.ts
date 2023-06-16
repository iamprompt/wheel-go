import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import type { Model } from 'mongoose'

import type { MediaDocument } from './media.schema'
import { Media } from './media.schema'

@Injectable()
export class MediaRepository {
  constructor(
    @InjectModel(Media.name) private readonly MediaModel: Model<MediaDocument>,
  ) {}

  async find(): Promise<MediaDocument[]> {
    return this.MediaModel.find().sort({ createdAt: -1 }).exec()
  }

  async findById(id: string): Promise<MediaDocument> {
    return this.MediaModel.findById(id).exec()
  }

  async create(media: Media): Promise<MediaDocument> {
    const createdMedia = new this.MediaModel(media)
    return createdMedia.save()
  }

  async updateMedia(id: string, media: Media): Promise<MediaDocument> {
    const updatedMedia = await this.MediaModel.findByIdAndUpdate(id, media, {
      new: true,
    })
    return updatedMedia
  }
}
