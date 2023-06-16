import { gql } from '@apollo/client'

import { ROUTE_FIELDS } from '../fragment/route'

export const SearchRoutes = gql`
  query SearchRoutes($from: String!, $to: String!) {
    getRoutes(options: { origin: $from, destination: $to }) {
      id
      type
      distance
      duration
    }
  }
`

export const GetPreDefinedRoutes = gql`
  ${ROUTE_FIELDS}

  query GetPreDefinedRoutes {
    getRoutes {
      ...RouteFields
    }
  }
`
export const GetMyTracedRoutes = gql`
  ${ROUTE_FIELDS}

  query GetMyTracedRoutes {
    getMyTracedRoutes {
      ...RouteFields
    }
  }
`

export const GetRouteById = gql`
  ${ROUTE_FIELDS}

  query GetRouteById($id: String!) {
    getRouteById(id: $id) {
      ...RouteFields
    }
  }
`
