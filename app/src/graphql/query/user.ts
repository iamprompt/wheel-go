import { gql } from '@apollo/client'

import { LANGUAGE_FIELDS } from '../fragment/language'
import { MEDIA_FIELDS } from '../fragment/media'

export const GetMyProfile = gql`
  ${MEDIA_FIELDS}

  query GetMyProfile {
    me {
      id
      firstname
      lastname
      username
      role
      email
      profileImage {
        ...MediaFields
      }
      metadata {
        impairmentLevel
        equipment
      }
    }
  }
`

export const GetMyFavoritePlaces = gql`
  query GetMyFavoritePlaces {
    me {
      metadata {
        favorites {
          addedAt
          place {
            id
            name {
              th
              en
            }
            type
          }
        }
      }
    }
  }
`

export const AddPlaceToFavorites = gql`
  mutation AddPlaceToFavorites($placeId: String!) {
    addFavoritePlace(placeId: $placeId) {
      id
    }
  }
`

export const RemovePlaceFromFavorites = gql`
  mutation RemovePlaceFromFavorites($placeId: String!) {
    removeFavoritePlace(placeId: $placeId) {
      id
    }
  }
`

export const IsFavoritePlace = gql`
  query IsFavoritePlace($placeId: String!) {
    isFavoritePlace(placeId: $placeId)
  }
`

export const GetMyProfileSummary = gql`
  query GetMyProfileSummary {
    getMySummary {
      distance
      routes
      reviews
      joinedAt
    }
  }
`

export const GetMyExp = gql`
  query GetMyExp {
    getMyExperiencePoint {
      level
      point
      nextLevelPoint
    }
  }
`

export const GetMyBadges = gql`
  ${LANGUAGE_FIELDS}

  query GetMyBadges {
    getMyBadges {
      badge {
        id
        name {
          ...LanguageFields
        }
        description {
          ...LanguageFields
        }
        color
        icon
        conditions {
          name {
            ...LanguageFields
          }
          description {
            ...LanguageFields
          }
          icon
          color
        }
      }
    }
  }
`
