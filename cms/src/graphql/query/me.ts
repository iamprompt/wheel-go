import { gql } from '@apollo/client'

export const GetMyProfile = gql`
  query GetMyProfile {
    me {
      id
      firstname
      lastname
      username
      role
    }
  }
`
