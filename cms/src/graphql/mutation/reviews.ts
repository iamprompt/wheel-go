import { gql } from '@apollo/client'

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $review: CreateReviewInput!) {
    updateReview(id: $id, review: $review) {
      place {
        id
      }
      comment
      official {
        isFlagged
        comment
      }
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`
