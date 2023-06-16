import { View } from 'react-native'

import COLORS from '~/styles/colors'

interface VerticalDividerProps {
  width?: number
  height?: number
}

export function VerticalDivider({ width = 1, height }: VerticalDividerProps) {
  return (
    <View
      style={{
        height: height ?? '100%',
        backgroundColor: COLORS.soap[100],
        width,
      }}
    />
  )
}
