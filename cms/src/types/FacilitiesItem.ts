import type { ConcernTypes } from '~/const/ConcernTypes'
import type { FacilityTypes } from '~/const/FacilityTypes'
import type { Status } from '~/const/Status'
import type { FacilityMetadata } from '~/types/FacilityMetadata'
import type { LanguageObject } from '~/types/LanguageObject'
import type { Location } from '~/types/Location'

export interface FacilityItem {
  id?: string
  concern: ConcernTypes | undefined
  detail: LanguageObject
  location: Location | undefined
  metadata: FacilityMetadata
  parent: string
  status: Status
  type: FacilityTypes | undefined
  isWarning: boolean
}

// export interface FacilitiesItem {
//   id: string
//   createdAt: string
//   updatedAt: string
//   type: string
//   concern?: string | null
//   detailTH: string
//   detailEN: string
//   geolocation?: [number, number] | number[] | null
//   rise?: number | null
//   length?: number | null
//   status?: string | null
//   busLines?: string[] | null
//   tramLines?: string[] | null
//   isWarning?: boolean | null
// }
// export interface FacilitiesInfoProps {
//   data: FacilityItem[]
// }
