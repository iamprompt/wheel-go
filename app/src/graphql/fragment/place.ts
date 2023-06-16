import { gql } from '@apollo/client'

import { LANGUAGE_FIELDS } from './language'
import { MEDIA_FIELDS } from './media'

export const PLACE_BRIEF_FIELDS = gql`
  ${LANGUAGE_FIELDS}
  ${MEDIA_FIELDS}

  fragment PlaceBriefFields on Place {
    name {
      ...LanguageFields
    }
    type
    images {
      ...MediaFields
    }
  }
`
