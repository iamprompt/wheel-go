import { gql } from '@apollo/client'

export const CreateReview = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(review: $input) {
      id
    }
  }
`
