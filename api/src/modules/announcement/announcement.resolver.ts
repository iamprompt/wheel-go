import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { ROLES } from '~/const/userRoles'
import { ActiveLang } from '~/decorators/activeLang.decorator'
import { CurrentUser } from '~/decorators/currentUser.decorator'
import { HasRoles } from '~/decorators/hasRoles.decorator'
import { GqlAuthGuard } from '~/guards/GqlAuthGuard'
import { GqlOptionalAuthGuard } from '~/guards/GqlOptionalAuthGuard'
import { RolesGuard } from '~/guards/RolesGuard'
import { User } from '../user/user.schema'
import { Announcement } from './announcement.schema'
import { AnnouncementService } from './announcement.service'
import { CreateAnnouncementInput } from './dto/createAnnouncement.dto'
import { GetAnnouncementsInput } from './dto/getAnnouncements.dto'

@Resolver()
export class AnnouncementResolver {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Query(() => [Announcement])
  @UseGuards(GqlOptionalAuthGuard)
  async getAnnouncements(
    @ActiveLang() lang: string,
    @Args('options', { nullable: true }) options?: GetAnnouncementsInput,
    @CurrentUser() user?: User,
  ) {
    return this.announcementService.find(
      options,
      lang,
      user?.role === ROLES.ADMIN,
    )
  }

  @Query(() => Announcement)
  @UseGuards(GqlOptionalAuthGuard)
  async getAnnouncementById(
    @Args('id', { type: () => String }) id: string,
    @ActiveLang() lang: string,
    @CurrentUser() user?: User,
  ) {
    return this.announcementService.findById(
      id,
      lang,
      user?.role === ROLES.ADMIN,
    )
  }

  @Mutation(() => Announcement)
  @HasRoles('ADMIN')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createAnnouncement(
    @Args('data') data: CreateAnnouncementInput,
    @CurrentUser() user: User,
    @ActiveLang() lang: string,
  ) {
    return this.announcementService.create(data, user.id, lang)
  }

  @Mutation(() => Announcement)
  @HasRoles('ADMIN')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async updateAnnouncement(
    @Args('id', { type: () => String }) id: string,
    @Args('data') data: CreateAnnouncementInput,
    @CurrentUser() user: User,
    @ActiveLang() lang: string,
  ) {
    return this.announcementService.update(id, data, user.id, lang)
  }

  @Mutation(() => Boolean)
  @HasRoles('ADMIN')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async deleteAnnouncement(@Args('id', { type: () => String }) id: string) {
    try {
      await this.announcementService.delete(id)
      return true
    } catch (error) {
      return false
    }
  }
}
