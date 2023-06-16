import { gql } from '@apollo/client'

export const GET_ANNOUNCEMNETS = gql`
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
      updatedAt
      status
    }
  }
`

export const GET_ANNOUNCEMNETS_ALL = gql`
  query GetAnnouncementsAll {
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
      place {
        id
        name {
          en
          th
        }
      }
      location {
        lat
        lng
      }
      tags
      metadata {
        line
        email
        phone
      }
      status
      updatedAt
      createdAt
    }
  }
`

export const GET_ANNOUNCEMENT_BY_ID = gql`
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
      status
      updatedAt
      createdAt
    }
  }
`
