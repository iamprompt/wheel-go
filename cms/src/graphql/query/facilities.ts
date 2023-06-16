import { gql } from '@apollo/client'

export const GET_FACILITIES_BY_PLACE_ID = gql`
  query getFacilitiesByPlaceId($placeId: String!) {
    getFacilitiesByPlaceId(placeId: $placeId) {
      id
      type
      parent {
        id
      }
      detail {
        th
        en
      }
      location {
        lat
        lng
      }
      concern
      metadata {
        length
        rise
      }
      status
      createdAt
      updatedAt
      isWarning
    }
  }
`

export const GET_FACILITY_BY_ID = gql`
  query getFacilityById($id: String!) {
    getFacilityById(id: $id) {
      id
      type
      parent {
        id
      }
      detail {
        th
        en
      }
      location {
        lat
        lng
      }
      concern
      metadata {
        length
        rise
      }
      status
      createdAt
      updatedAt
      isWarning
    }
  }
`
