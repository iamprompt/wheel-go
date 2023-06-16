import { Injectable } from '@nestjs/common'

import { AnnouncementRepository } from '~/database/announcements/announcement.service'
import { AnnouncementFactory } from './announcement.factory'
import { CreateAnnouncementInput } from './dto/createAnnouncement.dto'
import { GetAnnouncementsInput } from './dto/getAnnouncements.dto'

@Injectable()
export class AnnouncementService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository,
  ) {}

  async find(options: GetAnnouncementsInput = {}, lang = 'th', draft = false) {
    const announcements = await this.announcementRepository.find(options, draft)
    return AnnouncementFactory.createFromDatabase(announcements, lang)
  }

  async findById(id: string, lang = 'th', draft = false) {
    const announcement = await this.announcementRepository.findById(id, draft)
    return AnnouncementFactory.createFromDatabase(announcement, lang)
  }

  async create(
    announcement: CreateAnnouncementInput,
    userId: string,
    lang = 'th',
  ) {
    const announcementToSave = AnnouncementFactory.createToSave(
      announcement,
      userId,
    )
    const result = await this.announcementRepository.create(announcementToSave)

    return AnnouncementFactory.createFromDatabase(result, lang)
  }

  async update(
    id: string,
    announcement: CreateAnnouncementInput,
    userId?: string,
    lang = 'th',
  ) {
    const announcementToSave = AnnouncementFactory.createToSave(
      announcement,
      userId,
    )
    const result = await this.announcementRepository.update(
      id,
      announcementToSave,
    )

    return AnnouncementFactory.createFromDatabase(result, lang)
  }

  async delete(id: string) {
    return this.announcementRepository.delete(id)
  }
}
