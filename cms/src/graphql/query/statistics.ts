import { gql } from '@apollo/client'

export const GET_ALL_ROUTES = gql`
  query GetAllRoutes {
    getRoutes {
      id
    }
  }
`

export const GET_ALL_ANNOUNCEMENTS = gql`
  query GetAllAnnouncements {
    getAnnouncements {
      id
    }
  }
`

export const GET_ALL_PLACES = gql`
  query GetAllPlaces {
    getPlaces {
      id
    }
  }
`

export const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    getReviews {
      id
    }
  }
`

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getUsers {
      id
      metadata {
        impairmentLevel
      }
    }
  }
`
