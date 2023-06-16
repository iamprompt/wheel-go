import { Injectable } from '@nestjs/common'

import { determineExpLevel } from '~/utils/exp'
import { ReviewRepository, RouteRepository } from '~/database/mongo.service'
import { UserRepository } from '~/database/users/user.service'
import { ActivityLogService } from '../activityLog/activityLog.service'
import { BadgeService } from '../badge/badge.service'
import { ExperiencePoint } from '../object/exp.schema'
import { UserBadge } from '../object/userBadge.schema'
import { UserSummary } from '../object/userSummary.schema'
import { CreateUserInput } from './dto/createUser.dto'
import { UpdateUserInput } from './dto/updateUser.dto'
import { UserFactory } from './user.factory'
import { User } from './user.schema'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly routeRepository: RouteRepository,
    private readonly activityLogService: ActivityLogService,
    private readonly badgeService: BadgeService,
  ) {}

  async find(lang = 'th'): Promise<User[]> {
    const users = await this.userRepository.find()
    return UserFactory.createFromDatabase(users, lang)
  }

  async findById(id: string, lang = 'th'): Promise<User> {
    const user = await this.userRepository.findById(id)
    return UserFactory.createFromDatabase(user, lang)
  }

  async findByEmail(email: string, lang = 'th'): Promise<User> {
    const user = await this.userRepository.findByEmail(email)
    return UserFactory.createFromDatabase(user, lang)
  }

  async create(data: CreateUserInput, lang = 'th'): Promise<User> {
    const userToSave = UserFactory.createToSave(data)
    const user = await this.userRepository.create(userToSave)
    return UserFactory.createFromDatabase(user, lang)
  }

  async update(id: string, data: UpdateUserInput, lang = 'th'): Promise<User> {
    const userToUpdate = UserFactory.createToSave(data)
    const updateResult = await this.userRepository.update(id, userToUpdate)
    return UserFactory.createFromDatabase(updateResult, lang)
  }

  async addFavoritePlace(userId: string, placeId: string): Promise<User> {
    const user = await this.userRepository.addFavoritePlace(userId, placeId)
    return UserFactory.createFromDatabase(user)
  }

  async removeFavoritePlace(userId: string, placeId: string): Promise<User> {
    const user = await this.userRepository.removeFavoritePlace(userId, placeId)
    return UserFactory.createFromDatabase(user)
  }

  async isFavoritePlace(userId: string, placeId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId)
    return user.metadata.favorites.some(
      (favorite) => favorite.place.id === placeId,
    )
  }

  async getUserSummaryById(id: string): Promise<UserSummary> {
    const user = await this.findById(id)
    const reviewsNo = await this.reviewRepository.countByUserId(id)
    const routesNo = await this.routeRepository.countByUserId(id)
    const distance = await this.routeRepository.sumDistanceByUserId(id)

    return {
      reviews: reviewsNo,
      distance,
      routes: routesNo,
      joinedAt: user.createdAt,
    }
  }

  async getExperiencePointByUserId(id: string): Promise<ExperiencePoint> {
    const activities = await this.activityLogService.findByUserId(id)
    const experiencePoint = activities.reduce((acc, activity) => {
      return acc + activity.point
    }, 0)

    const level = determineExpLevel(experiencePoint)

    return {
      level: level.currentlevel,
      point: experiencePoint,
      nextLevelPoint: level.nextLevelExp,
    }
  }

  async addBadge(userId: string, badgeId: string): Promise<UserBadge> {
    const user = await this.userRepository.addBadge(userId, badgeId)
    const formattedUser = UserFactory.createFromDatabase(user)
    return formattedUser.badges.find((badge) => badge.badge.id === badgeId)
  }

  async getBadgesByUserId(id: string): Promise<UserBadge[]> {
    const eligibleBadges = await this.badgeService.getEligibleBadges(id)

    console.log(eligibleBadges.length)

    // Check if user has already earned the badge
    const user = await this.findById(id)
    const newEarnedBadges = eligibleBadges.filter((badge) => {
      return !user.badges.some((userBadge) => userBadge.badge.id === badge.id)
    })

    for (const badge of newEarnedBadges) {
      await this.userRepository.addBadge(id, badge.id)
    }

    const newUser = await this.findById(id)

    return newUser.badges
  }
}
