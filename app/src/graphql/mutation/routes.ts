import { gql } from '@apollo/client'

export const CreateRoutes = gql`
  mutation CreateRoutes($input: CreateRouteInput!) {
    createRoute(data: $input) {
      id
    }
  }
`
