import { Injectable } from '@nestjs/common'

import { ActivityLogRepository } from '~/database/mongo.service'
import { ActivityLogFactory } from './activityLog.factory'
import { CreateActivityLogInput } from './activityLog/createActivityLog.dto'

@Injectable()
export class ActivityLogService {
  constructor(private readonly activityLogRepository: ActivityLogRepository) {}

  async find() {
    const activityLogs = await this.activityLogRepository.find()
    return ActivityLogFactory.createFromDatabase(activityLogs)
  }

  async findById(id: string) {
    const activityLog = await this.activityLogRepository.findById(id)

    return ActivityLogFactory.createFromDatabase(activityLog)
  }

  async findByUserId(userId: string) {
    const activityLogs = await this.activityLogRepository.findByUserId(userId)
    return ActivityLogFactory.createFromDatabase(activityLogs)
  }

  async findByActivityType(activityType: string) {
    const activityLogs = await this.activityLogRepository.findByActivityType(
      activityType,
    )

    return ActivityLogFactory.createFromDatabase(activityLogs)
  }

  async create(activityLog: CreateActivityLogInput, userId: string) {
    const activityLogToSave = ActivityLogFactory.createToSave(
      activityLog,
      userId,
    )

    const activity = await this.activityLogRepository.create(activityLogToSave)

    return ActivityLogFactory.createFromDatabase(activity)
  }
}
