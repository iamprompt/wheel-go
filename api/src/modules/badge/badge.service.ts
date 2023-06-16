import { Injectable } from '@nestjs/common'

import { BadgeRepository } from '~/database/mongo.service'
import { ActivityLogService } from '../activityLog/activityLog.service'
import { BadgeFactory } from './badge.factory'
import { Badge } from './badge.schema'
import { CreateBadgeInput } from './dto/createBadge.dto'

@Injectable()
export class BadgeService {
  constructor(
    private readonly badgeRepository: BadgeRepository,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async find(): Promise<Badge[]> {
    const badges = await this.badgeRepository.find()

    return BadgeFactory.createFromDatabase(badges)
  }

  async findById(id: string): Promise<Badge | undefined> {
    const badge = await this.badgeRepository.findById(id)

    return BadgeFactory.createFromDatabase(badge)
  }

  async create(payload: CreateBadgeInput): Promise<Badge | undefined> {
    const badge = await this.badgeRepository.create(
      BadgeFactory.createToSave(payload),
    )

    return BadgeFactory.createFromDatabase(badge)
  }

  async update(
    id: string,
    payload: CreateBadgeInput,
  ): Promise<Badge | undefined> {
    const badge = await this.badgeRepository.update(
      id,
      BadgeFactory.createToSave(payload),
    )

    return BadgeFactory.createFromDatabase(badge)
  }

  async delete(id: string): Promise<Badge | undefined> {
    const badge = await this.badgeRepository.delete(id)

    return BadgeFactory.createFromDatabase(badge)
  }

  async getEligibleBadges(userId: string): Promise<Badge[]> {
    const activityLogs = await this.activityLogService.findByUserId(userId)
    const badges = await this.find()

    const eligibleBadges = badges.filter((badge) => {
      // Check eligibility for each condition
      const passedConditions = badge.conditions.every((condition) => {
        const eligibleActivityLogs = activityLogs.filter((activityLog) => {
          return (
            activityLog.action === condition.type
            // activityLog.createdAt >= condition.startDate &&
            // activityLog.createdAt <= condition.endDate
          )
        })

        return eligibleActivityLogs.length >= condition.requiredCount
      })

      return passedConditions
    })

    return eligibleBadges
  }
}
