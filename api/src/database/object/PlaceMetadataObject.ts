import { ACCESSIBILITY_STATUS } from '~/const/accessibilityStatus'

export const PlaceMetadataObject = {
  website: { type: String },
  phone: { type: String },
  busLines: { type: [String] },
  tramLines: { type: [String] },
  accessibility: {
    type: String,
    enum: Object.values(ACCESSIBILITY_STATUS),
  },
}

export interface PlaceMetadata {
  website?: string
  phone?: string
  busLines?: string[]
  tramLines?: string[]
  accessibility?: ACCESSIBILITY_STATUS
}
