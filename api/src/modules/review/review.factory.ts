import { createRefToSave } from '~/utils/factory'
import {
  Review as ReviewDB,
  ReviewDocument,
} from '~/database/reviews/review.schema'
import { MediaFactory } from '../media/media.factory'
import { PlaceFactory } from '../place/place.factory'
import { UserFactory } from '../user/user.factory'
import { CreateReviewInput } from './dto/createReview.dto'
import { Review } from './review.schema'

type ReturnReviewOrArray<
  T extends ReviewDocument | ReviewDocument[] | undefined | null,
> = T extends ReviewDocument[]
  ? Review[]
  : T extends ReviewDocument
  ? Review
  : undefined

export class ReviewFactory {
  static createFromDatabase<
    T extends ReviewDocument | ReviewDocument[] | undefined | null,
  >(data: T, lang = 'th'): ReturnReviewOrArray<T> {
    if (!data) {
      return undefined
    }

    if (Array.isArray(data)) {
      return <ReturnReviewOrArray<T>>data.map((d) => this.createFromDatabase(d))
    }

    return <ReturnReviewOrArray<T>>{
      id: data._id.toString(),
      place: PlaceFactory.createFromDatabase(data.place, lang),
      user: UserFactory.createFromDatabase(data.user),
      rating: {
        overall: data?.rating?.overall,
        ramp: data?.rating?.ramp,
        assistance: data?.rating?.assistance,
        elevator: data?.rating?.elevator,
        parking: data?.rating?.parking,
        surface: data?.rating?.surface,
        toilet: data?.rating?.toilet,
      },
      comment: data.comment,
      images: MediaFactory.createFromDatabase(data.images),
      tags: data.tags,
      official: data.official,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }

  static createToSave(data: CreateReviewInput): ReviewDB {
    return {
      // @ts-expect-error Only ObjectId is needed
      place: createRefToSave(data.place),
      // @ts-expect-error Only ObjectId is needed
      user: createRefToSave(data.user),
      rating: data.rating,
      comment: data.comment,
      // @ts-expect-error Only ObjectId is needed
      images: createRefToSave(data.images),
      tags: data.tags,
      official: data.official,
    }
  }
}
