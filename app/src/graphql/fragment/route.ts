import { gql } from '@apollo/client'

import { LOCATION_FIELDS } from './location'

export const ROUTE_FIELDS = gql`
  ${LOCATION_FIELDS}

  fragment RouteFields on Route {
    id
    type
    paths {
      ...LocationFields
    }
    distance
    duration
    createdAt
  }
`
