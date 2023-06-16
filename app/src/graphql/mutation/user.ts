import { gql } from '@apollo/client'

export const UpdateProfile = gql`
  mutation UpdateProfile($input: UpdateUserInput!) {
    updateUser(data: $input) {
      id
    }
  }
`
