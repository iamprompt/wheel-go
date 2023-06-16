import { gql } from '@apollo/client'

export const CREATE_FACILITY = gql`
  mutation CreateFacility($data: CreateFacilityInput!) {
    createFacility(data: $data) {
      id
      type
      parent {
        id
      }
      detail {
        th
        en
      }
      location {
        lat
        lng
      }
      concern
      isWarning
      metadata {
        length
        rise
      }
      status
      createdAt
      updatedAt
    }
  }
`
export const UPDATE_FACILITY = gql`
  mutation UpdateFacility($id: String!, $data: CreateFacilityInput!) {
    updateFacility(id: $id, data: $data) {
      id
      type
      parent {
        id
      }
      detail {
        th
        en
      }
      location {
        lat
        lng
      }
      concern
      isWarning
      metadata {
        length
        rise
      }
      status
      createdAt
      updatedAt
    }
  }
`

export const DELETE_FACILITY = gql`
  mutation DeleteFacility($id: String!) {
    deleteFacility(id: $id)
  }
`
