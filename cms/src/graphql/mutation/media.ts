import { gql } from '@apollo/client'

export const UPLOAD_MEDIA = gql`
  mutation UploadMedia($file: Upload!) {
    uploadMedia(file: $file) {
      id
      url
      filename
    }
  }
`
