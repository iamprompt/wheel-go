interface IAccessibilityRating {
  [key: number]: {
    description: string
  }
}

export const AccessibilityRating: IAccessibilityRating = {
  0: {
    description: 'reviews.accessibility_rating.rating_0',
  },
  1: {
    description: 'reviews.accessibility_rating.rating_1',
  },
  2: {
    description: 'reviews.accessibility_rating.rating_2',
  },
  3: {
    description: 'reviews.accessibility_rating.rating_3',
  },
  4: {
    description: 'reviews.accessibility_rating.rating_4',
  },
  5: {
    description: 'reviews.accessibility_rating.rating_5',
  },
}

export const FacilityRatingTag: Record<string, string> = {
  cleanliness: 'reviews.facility_tags.cleanliness',
  goodService: 'reviews.facility_tags.good_service',
  niceFacilities: 'reviews.facility_tags.nice_facilities',
  safety: 'reviews.facility_tags.safety',
}
