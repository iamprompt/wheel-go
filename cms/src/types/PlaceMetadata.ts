import type { AccessibilityTypes } from '~/const/AccessibilityTypes'

export interface PlaceMetadata {
  accessibility: AccessibilityTypes | null | undefined
  busLines: string[]
  phone: string | null
  tramLines: string[]
  website: string | null
}
