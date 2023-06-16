import { gql } from '@apollo/client'

export const GetRatingSummary = gql`
  query GetRatingSummary($placeIds: [String!]!) {
    getRatingSummaryByPlaceIds(ids: $placeIds) {
      id
      overall
    }
  }
`
