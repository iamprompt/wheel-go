import { gql } from '@apollo/client'

export const CREATE_PLACE = gql`
  mutation CreatePlace($data: CreatePlaceInput!) {
    createPlace(data: $data) {
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
export const UPDATE_PLACE = gql`
  mutation UpdatePlace($id: String!, $data: CreatePlaceInput!) {
    updatePlace(id: $id, data: $data) {
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

export const DELETE_PLACE = gql`
  mutation DeletePlace($id: String!) {
    deletePlace(id: $id)
  }
`
