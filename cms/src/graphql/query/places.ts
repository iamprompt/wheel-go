import { gql } from '@apollo/client'

export const GET_PLACES = gql`
  query GetPlaces {
    getPlaces {
      id
      type
      name {
        en
        th
      }
      location {
        lat
        lng
      }
      internalCode
      status
      updatedAt
    }
  }
`
export const GET_PLACES_ALL = gql`
  query GetPlacesAll {
    getPlaces {
      id
      type
      name {
        en
        th
      }
      address {
        th
        en
      }
      location {
        lat
        lng
      }
      images {
        url
      }
      internalCode
      metadata {
        website
        phone
        busLines
        tramLines
        accessibility
      }
      status
      createdAt
      updatedAt
    }
  }
`

export const GET_PLACE_BY_ID = gql`
  query GetPlaceById($id: String!) {
    getPlaceById(id: $id) {
      id
      type
      name {
        th
        en
      }
      address {
        th
        en
      }
      location {
        lat
        lng
      }
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
      internalCode
      metadata {
        website
        phone
        busLines
        tramLines
        accessibility
      }
      status
      createdAt
      updatedAt
    }
  }
`

export const GET_PLACE_NAME_BY_ID = gql`
  query GetPlaceNameById($id: String!) {
    getPlaceById(id: $id) {
      id
      name {
        th
        en
      }
      internalCode
    }
  }
`
