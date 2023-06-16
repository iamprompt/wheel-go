import type { ComponentProps } from 'react'

import type { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'

export enum TRACING_STATES {
  READY = 'READY',
  RECORDING = 'RECORDING',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
  SAVED = 'SAVED',
}

export const TRACING_STATUS_BADGES = {
  [TRACING_STATES.READY]: {
    label: 'trace.status.ready',
    color: COLORS['french-vanilla'][400],
    icon: 'backpack',
  },
  [TRACING_STATES.RECORDING]: {
    label: 'trace.status.recording',
    color: COLORS.error[500],
    icon: 'radio_button_checked',
  },
  [TRACING_STATES.PAUSED]: {
    label: 'trace.status.paused',
    color: COLORS.warning[400],
    icon: 'pause_circle_outline',
  },
  [TRACING_STATES.FINISHED]: {
    label: 'trace.status.finished',
    color: COLORS.success[400],
    icon: 'check_circle_outline',
  },
  [TRACING_STATES.SAVED]: {
    label: 'trace.status.saved',
    color: COLORS.info[400],
    icon: 'save_alt',
  },
} satisfies Record<
  TRACING_STATES,
  {
    label: string
    color: string
    icon: ComponentProps<typeof MaterialIcons>['name']
  }
>
