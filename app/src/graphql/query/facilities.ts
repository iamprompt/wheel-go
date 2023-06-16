import { gql } from '@apollo/client'

export const GetFacilities = gql`
  query GetFacilities($options: GetFacilitiesInput! = {}) {
    getFacilities(options: $options) {
      id
      type
      location {
        lat
        lng
      }
    }
  }
`

export const GetFacilitiesByPlaceId = gql`
  query GetFacilitiesByPlaceId($id: String!) {
    getFacilitiesByPlaceId(placeId: $id) {
      id
      type
      detail {
        th
        en
      }
    }
  }
`
