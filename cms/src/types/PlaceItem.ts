import type { Categories } from '~/const/Category'
import type { Status } from '~/const/Status'
import type { LanguageObject } from '~/types/LanguageObject'
import type { Location } from '~/types/Location'
import type { Media } from '~/types/Media'
import type { PlaceMetadata } from '~/types/PlaceMetadata'

export interface PlaceItem {
  id?: string
  address: LanguageObject
  images: Media[]
  internalCode: string | null
  location: Location | null
  metadata: PlaceMetadata
  name: LanguageObject
  status: Status | null
  type: keyof typeof Categories | null
  createdAt?: string
  updatedAt?: string
}
// export interface PlaceItem {
//   id: string
//   createdAt: string
//   updatedAt: string
//   nameTH: string
//   nameEN: string
//   category: string
//   placeAddressTH: string
//   placeAddressEN: string
//   phone: string
//   website: string
//   image?: {
//     url?: string
//   }
//   geolocation: [number, number] | number[]
//   placeCode: string
//   status: Status
// }
