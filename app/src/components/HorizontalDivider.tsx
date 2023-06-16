import { View } from 'react-native'

import COLORS from '~/styles/colors'

interface HorizontalDividerProps {
  height?: number
  width?: number
}

export function HorizontalDivider({
  height = 1,
  width,
}: HorizontalDividerProps) {
  return (
    <View
      style={{
        height,
        backgroundColor: COLORS.soap[100],
        width: width ?? '100%',
      }}
    />
  )
}
