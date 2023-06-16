import type { ComponentProps } from 'react'

import type { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'

interface Mission {
  title: string
  description?: string
  icon: ComponentProps<typeof MaterialIcons>['name']
  color?: string
  completed?: boolean
  progress?: number
  total?: number
}

interface Badge {
  label: string
  icon: ComponentProps<typeof MaterialIcons>['name']
  color: string
  description: string
  missions?: Mission[]
  modal?: boolean
}

export const BADGES: Record<string, Badge> = {
  coming_soon: {
    label: 'badges.coming_soon',
    icon: 'question_mark',
    color: COLORS['french-vanilla'][200],
    description: 'badges.coming_soon_description',
    modal: false,
  },
  novice_navigator: {
    label: 'badges.novice_navigator',
    icon: 'navigation',
    color: COLORS.cantaloupe[300],
    description: 'badges.navigator_description',
    missions: [
      {
        title: 'routes_mission',
        description: 'badges.routes_mission_description',
        icon: 'draw',
        color: COLORS.magenta[500],
        completed: true,
        progress: 3,
        total: 3,
      },
    ],
  },
  skillful_navigator: {
    label: 'badges.skillful_navigator',
    icon: 'navigation',
    color: COLORS.indigo[400],
    description: 'badges.navigator_description',
    missions: [
      {
        title: 'routes_mission',
        description: 'badges.routes_mission_description',
        icon: 'draw',
        color: COLORS.magenta[500],
        completed: true,
        progress: 15,
        total: 15,
      },
    ],
  },
  master_navigator: {
    label: 'badges.master_navigator',
    icon: 'navigation',
    color: COLORS.kiwi[400],
    description: 'badges.navigator_description',
    missions: [
      {
        title: 'routes_mission',
        description: 'badges.routes_mission_description',
        icon: 'draw',
        color: COLORS.magenta[500],
        completed: true,
        progress: 45,
        total: 45,
      },
    ],
  },
  novice_reviewer: {
    label: 'badges.novice_reviewer',
    icon: 'rate_review',
    color: COLORS.cantaloupe[300],
    description: 'badges.reviewer_description',
    missions: [
      {
        title: 'reviews_mission',
        description: 'badges.reviews_mission_description',
        icon: 'rate_review',
        color: COLORS.magenta[500],
        completed: true,
        progress: 3,
        total: 3,
      },
    ],
  },
  skillful_reviewer: {
    label: 'badges.skillful_reviewer',
    icon: 'rate_review',
    color: COLORS.indigo[400],
    description: 'badges.reviewer_description',
    missions: [
      {
        title: 'reviews_mission',
        description: 'badges.reviews_mission_description',
        icon: 'rate_review',
        color: COLORS.magenta[500],
        completed: true,
        progress: 15,
        total: 15,
      },
    ],
  },
  master_reviewer: {
    label: 'badges.master_reviewer',
    icon: 'rate_review',
    color: COLORS.kiwi[400],
    description: 'badges.reviewer_description',
    missions: [
      {
        title: 'reviews_mission',
        description: 'badges.reviews_mission_description',
        icon: 'rate_review',
        color: COLORS.magenta[500],
        completed: true,
        progress: 45,
        total: 45,
      },
    ],
  },
}
