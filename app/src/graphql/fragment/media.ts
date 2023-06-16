import { gql } from '@apollo/client'

export const MEDIA_FIELDS = gql`
  fragment MediaFields on Media {
    id
    url
    width
    height
  }
`
