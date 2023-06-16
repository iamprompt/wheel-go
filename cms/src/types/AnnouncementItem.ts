import type { Status } from '~/const/Status'
import type { AnnouncementMetadata } from '~/types/AnnouncementMetadata'
import type { LanguageObject } from '~/types/LanguageObject'
import type { Location } from '~/types/Location'
import type { Media } from '~/types/Media'

export interface AnnouncementItem {
  id?: string
  content: LanguageObject
  images: Media[]
  location: Location | null
  metadata: AnnouncementMetadata
  place: string | null
  status: Status | null
  tags: string[]
  title: LanguageObject
  user: string | null
  createdAt?: string
  updatedAt?: string
}

// export interface AnnouncementItem {
//   id: string
//   createdAt: string
//   updatedAt: string
//   titleTH: string
//   titleEN: string
//   descriptionTH: string
//   descriptionEN: string
//   location: [number, number] | number[]
//   place: {
//     nameTH: string
//     nameEN: string
//   }
//   image: {
//     url: string
//   }
//   tags: string[]
//   contact: {
//     phone: string
//     email: string
//     line: string
//   }
//   status: Status
// }
