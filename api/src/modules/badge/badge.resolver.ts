import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Badge } from './badge.schema'
import { BadgeService } from './badge.service'
import { CreateBadgeInput } from './dto/createBadge.dto'

@Resolver()
export class BadgeResolver {
  constructor(private readonly badgeService: BadgeService) {}

  @Query(() => [Badge])
  async getBadges(): Promise<Badge[]> {
    return this.badgeService.find()
  }

  @Query(() => Badge)
  async getBadgeById(id: string): Promise<Badge> {
    return this.badgeService.findById(id)
  }

  @Mutation(() => Badge)
  async createBadge(@Args('data') data: CreateBadgeInput): Promise<Badge> {
    return this.badgeService.create(data)
  }

  @Mutation(() => Badge)
  async updateBadge(
    @Args('id') id: string,
    @Args('data') data: CreateBadgeInput,
  ): Promise<Badge> {
    return this.badgeService.update(id, data)
  }

  @Mutation(() => Badge)
  async deleteBadge(@Args('id') id: string): Promise<Badge> {
    return this.badgeService.delete(id)
  }
}
