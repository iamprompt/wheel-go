import { createRefToSave } from '~/utils/factory'
import {
  Announcement as AnnouncementDB,
  AnnouncementDocument,
} from '~/database/announcements/announcement.schema'
import { MediaFactory } from '../media/media.factory'
import { LocationFactory } from '../object/factory/location.factory'
import { PlaceFactory } from '../place/place.factory'
import { UserFactory } from '../user/user.factory'
import { Announcement } from './announcement.schema'
import { CreateAnnouncementInput } from './dto/createAnnouncement.dto'

type ReturnAnnouncementOrArray<
  T extends AnnouncementDocument | AnnouncementDocument[] | undefined | null,
> = T extends AnnouncementDocument[]
  ? Announcement[]
  : T extends AnnouncementDocument
  ? Announcement
  : undefined

export class AnnouncementFactory {
  static createFromDatabase<
    T extends AnnouncementDocument | AnnouncementDocument[] | undefined | null,
  >(announcements: T, lang = 'th'): ReturnAnnouncementOrArray<T> {
    if (!announcements) {
      return undefined
    }

    if (Array.isArray(announcements)) {
      return <ReturnAnnouncementOrArray<T>>(
        announcements.map((announcement) =>
          AnnouncementFactory.createFromDatabase(announcement, lang),
        )
      )
    }

    return <ReturnAnnouncementOrArray<T>>{
      id: announcements._id.toString(),
      title: announcements.title,
      content: announcements.content,
      metadata: announcements.metadata,
      images: MediaFactory.createFromDatabase(announcements.images),
      place: PlaceFactory.createFromDatabase(announcements.place, lang),
      location: LocationFactory.createFromDatabase(announcements.location),
      tags: announcements.tags,
      user: UserFactory.createFromDatabase(announcements.user),
      status: announcements.status,
      createdAt: announcements.createdAt,
      updatedAt: announcements.updatedAt,
    }
  }

  static createToSave(
    data: CreateAnnouncementInput,
    userId: string,
  ): AnnouncementDB {
    return {
      title: data.title,
      content: data.content,
      metadata: data.metadata,
      // @ts-expect-error Only ObjectId is required
      images: createRefToSave(data.images),
      // @ts-expect-error Only ObjectId is required
      place: data.place === '' ? undefined : createRefToSave(data.place),
      location: LocationFactory.createToSave(data.location),
      tags: data.tags,
      // @ts-expect-error Only _id is required
      user: data.user ? createRefToSave(data.user) : createRefToSave(userId),
      status: data.status,
    }
  }
}
