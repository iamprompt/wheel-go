import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'

import { Media, MediaDocument } from '../media/media.schema'
import type { OfficialReview } from '../object/OfficialReviewObject'
import { OfficialReviewObject } from '../object/OfficialReviewObject'
import type { Rating } from '../object/RatingObject'
import { RatingObject } from '../object/RatingObject'
import { Place, PlaceDocument } from '../places/place.schema'
import { User, UserDocument } from '../users/user.schema'
import { Timestamp, TimestampConfig } from '../utils/timestamp'

@Schema({ collection: 'reviews', timestamps: TimestampConfig })
export class Review {
  @Prop({ type: Types.ObjectId, ref: Place.name })
  place: PlaceDocument

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: UserDocument

  @Prop({ type: RatingObject })
  rating: Rating

  @Prop()
  comment: string

  @Prop({ type: [{ type: Types.ObjectId, ref: Media.name }] })
  images: MediaDocument[]

  @Prop({ type: [{ type: String }] })
  tags: string[]

  @Prop({ type: OfficialReviewObject })
  official: OfficialReview
}

export type ReviewDocument = HydratedDocument<Review, Timestamp>
export const ReviewSchema = SchemaFactory.createForClass(Review)
