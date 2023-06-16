import type { TransitionProps } from '@mantine/core'

export const transitionProps: Partial<Omit<TransitionProps, 'mounted'>> = {
  transition: 'pop-top-left',
  duration: 80,
  timingFunction: 'ease',
}
