import { gql } from '@apollo/client'

export const GET_ROUTE_PATHS = gql`
  query GetRoutePaths {
    getRoutes {
      id
      paths {
        lat
        lng
      }
    }
  }
`
