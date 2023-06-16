import { gql } from '@apollo/client'

export const UploadMedia = gql`
  mutation UploadMedia($file: Upload!) {
    uploadMedia(file: $file) {
      id
      url
    }
  }
`
