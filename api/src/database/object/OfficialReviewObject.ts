export const OfficialReviewObject = {
  isFlagged: { type: Boolean },
  comment: { type: String },
  timestamp: { type: Date },
}

export interface OfficialReview {
  isFlagged: boolean
  comment: string
  timestamp: Date
}
