import { gql } from '@apollo/client'

export const GET_REVIEWS = gql`
  query GetReviews {
    getReviews {
      id
      place {
        id
        name {
          en
          th
        }
        internalCode
      }
      user {
        username
        firstname
        lastname
      }
      comment
      updatedAt
      rating {
        overall
      }
      official {
        isFlagged
      }
    }
  }
`
export const GET_REVIEWS_ALL = gql`
  query GetReviewsAll {
    getReviews {
      id
      place {
        id
        name {
          en
          th
        }
      }
      user {
        username
        firstname
        lastname
      }
      rating {
        overall
        ramp
        assistance
        elevator
        parking
        surface
        toilet
      }
      comment
      images {
        url
      }
      tags
      official {
        isFlagged
        comment
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_REVIEW_BY_ID = gql`
  query getReviewById($id: ID!) {
    getReviewById(id: $id) {
      id
      place {
        id
        name {
          en
          th
        }
        internalCode
        type
      }
      user {
        username
        firstname
        lastname
      }
      rating {
        overall
        ramp
        assistance
        elevator
        parking
        surface
        toilet
      }
      comment
      images {
        id
        filename
        mimetype
        filesize
        width
        height
        url
        createdAt
        updatedAt
      }
      tags
      official {
        isFlagged
        comment
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`
