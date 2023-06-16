import { LinearGradient } from 'expo-linear-gradient'
import type { ComponentProps, FC } from 'react'

interface BrandGradientProps
  extends Omit<
    ComponentProps<typeof LinearGradient>,
    'colors' | 'start' | 'end'
  > {}

export const BrandGradient: FC<BrandGradientProps> = ({ ...props }) => {
  return (
    <LinearGradient
      colors={['#6A11B1', '#78CCDD']}
      start={[0, 0.5]}
      end={[1, 0.5]}
      {...props}
    />
  )
}
