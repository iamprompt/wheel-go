import { gql } from '@apollo/client'

import { MEDIA_FIELDS } from '../fragment/media'
import { PLACE_BRIEF_FIELDS } from '../fragment/place'
import { RATING_FIELDS } from '../fragment/rating'

export const GetMyReviews = gql`
  ${PLACE_BRIEF_FIELDS}

  query GetMyReviews {
    getMyReviews {
      id
      place {
        ...PlaceBriefFields
      }
      rating {
        overall
      }
      createdAt
    }
  }
`

export const GetReviewById = gql`
  ${MEDIA_FIELDS}
  ${PLACE_BRIEF_FIELDS}

  query GetReviewById($id: ID!) {
    getReviewById(id: $id) {
      id
      place {
        ...PlaceBriefFields
      }
      rating {
        ...RatingFields
      }
      comment
      images {
        ...MediaFields
      }
      tags
      official {
        isFlagged
        comment
        timestamp
      }
      createdAt
    }
  }
`

export const GetReviewsByPlaceId = gql`
  ${RATING_FIELDS}
  ${MEDIA_FIELDS}

  query GetReviewsByPlaceId($placeId: ID!) {
    getReviewsByPlaceId(placeId: $placeId) {
      id
      user {
        id
        firstname
        lastname
      }
      rating {
        ...RatingFields
      }
      comment
      images {
        ...MediaFields
      }
      tags
      official {
        isFlagged
        comment
        timestamp
      }
      createdAt
    }
  }
`
