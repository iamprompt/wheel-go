import { gql } from '@apollo/client'

export const RATING_FIELDS = gql`
  fragment RatingFields on RatingObject {
    overall
    ramp
    assistance
    elevator
    toilet
    parking
    surface
  }
`
