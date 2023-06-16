import { gql } from '@apollo/client'

export const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($data: CreateAnnouncementInput!) {
    createAnnouncement(data: $data) {
      id
      title {
        th
        en
      }
      content {
        th
        en
      }
      place {
        id
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
      tags
      metadata {
        line
        email
        phone
      }
      user {
        id
      }
      status
      createdAt
      updatedAt
    }
  }
`
export const UPDATE_ANNOUNCEMENT = gql`
  mutation UpdateAnnouncement($id: String!, $data: CreateAnnouncementInput!) {
    updateAnnouncement(id: $id, data: $data) {
      id
      title {
        th
        en
      }
      content {
        th
        en
      }
      place {
        id
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
      tags
      metadata {
        line
        email
        phone
      }
      user {
        id
      }
      status
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncement($id: String!) {
    deleteAnnouncement(id: $id)
  }
`
