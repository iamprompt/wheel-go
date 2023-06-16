import { registerEnumType } from '@nestjs/graphql'

import { ACCESSIBILITY_STATUS } from '~/const/accessibilityStatus'
import { CONCERN_TYPES } from '~/const/concernTypes'
import { FACILITY_STATUS } from '~/const/facilityStatus'
import { FACILITY_TYPES } from '~/const/facilityTypes'
import { PLACE_TYPES } from '~/const/placeTypes'
import { ROUTE_TYPES } from '~/const/routeTypes'
import { STATUS } from '~/const/status'
import { ROLES } from '~/const/userRoles'

registerEnumType(STATUS, {
  name: 'STATUS',
  description: 'Status of the document',
  valuesMap: {
    DRAFT: {
      description: 'Draft (not published)',
    },
    PUBLISHED: {
      description: 'Published',
    },
  },
})

registerEnumType(ROUTE_TYPES, {
  name: 'ROUTE_TYPES',
  description: 'Type of the route',
  valuesMap: {
    PRE_DEFINED: {
      description: 'Pre-defined route',
    },
    TRACED: {
      description: 'Traced route',
    },
  },
})

registerEnumType(ROLES, {
  name: 'ROLES',
  description: 'Roles of the user',
  valuesMap: {
    ADMIN: {
      description: 'Admin',
    },
    USER: {
      description: 'User',
    },
  },
})

registerEnumType(PLACE_TYPES, {
  name: 'PLACE_TYPES',
})

registerEnumType(FACILITY_TYPES, {
  name: 'FACILITY_TYPES',
})

registerEnumType(CONCERN_TYPES, {
  name: 'CONCERN_TYPES',
})

registerEnumType(ACCESSIBILITY_STATUS, {
  name: 'ACCESSIBILITY_STATUS',
})

registerEnumType(FACILITY_STATUS, {
  name: 'FACILITY_STATUS',
})
