import { gql } from '@apollo/client'

export const GetAnnouncements = gql`
  query GetAnnouncements {
    getAnnouncements {
      id
      title {
        th
        en
      }
      content {
        th
        en
      }
      tags
      place {
        id
        name {
          th
          en
        }
      }
      location {
        lat
        lng
      }
      createdAt
    }
  }
`

export const GetAnnouncementById = gql`
  query GetAnnouncementById($id: String!) {
    getAnnouncementById(id: $id) {
      id
      title {
        th
        en
      }
      content {
        th
        en
      }
      tags
      images {
        id
        url
        width
        height
      }
      metadata {
        phone
        email
        line
      }
      place {
        id
        name {
          th
          en
        }
        type
      }
      createdAt
    }
  }
`
