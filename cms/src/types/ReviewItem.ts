import type { Media } from '~/types/Media'
import type { OfficialReviewObject } from '~/types/OfficialReviewObject'
import type { PlaceItem } from '~/types/PlaceItem'
import type { RatingObject } from '~/types/RatingObject'

export interface ReviewItem {
  id: string
  comment: string | null
  images: Media[]
  official: OfficialReviewObject
  place: PlaceItem
  rating: RatingObject
  tags: string[]
  user: string
  createdAt: string
  updatedAt: string
}
// export interface ReviewItem {
//   id: string
//   createdAt: string
//   updatedAt: string
//   place: {
//     nameTH: string
//     nameEN: string
//   }
//   user: {
//     username: string
//   }
//   comment: string
//   image: {
//     url: string
//   }
//   rating: {
//     overall: number
//     ramp?: number
//     assistance?: number
//     elevator?: number
//     parking?: number
//     surface?: number
//     toilet?: number
//     facility?: string[]
//     isFlagged: boolean
//     additionalComment: string
//   }
// }
