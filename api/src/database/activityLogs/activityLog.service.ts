import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'

import { ActivityLog, ActivityLogDocument } from './activityLog.schema'

@Injectable()
export class ActivityLogRepository {
  constructor(
    @InjectModel(ActivityLog.name)
    private readonly ActivityLogModel: Model<ActivityLogDocument>,
  ) {}

  populateOptions: Parameters<(typeof this.ActivityLogModel)['populate']>['0'] =
    ['user', 'route', 'review']

  async create(activityLog: ActivityLog): Promise<ActivityLogDocument> {
    const createdActivityLog = new this.ActivityLogModel(activityLog)
    return (await createdActivityLog.save()).populate(this.populateOptions)
  }

  async find(): Promise<ActivityLogDocument[]> {
    return this.ActivityLogModel.find().populate(this.populateOptions).exec()
  }

  async findById(id: string): Promise<ActivityLogDocument> {
    return this.ActivityLogModel.findById(id)
      .populate(this.populateOptions)
      .exec()
  }

  async findByUserId(userId: string): Promise<ActivityLogDocument[]> {
    return this.ActivityLogModel.find({ user: new ObjectId(userId) })
      .populate(this.populateOptions)
      .exec()
  }

  async findByActivityType(
    activityType: string,
  ): Promise<ActivityLogDocument[]> {
    return this.ActivityLogModel.find({ action: activityType })
      .populate(this.populateOptions)
      .exec()
  }
}
