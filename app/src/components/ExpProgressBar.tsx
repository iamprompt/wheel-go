import { useState } from 'react'
import { Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'

export function ExpProgressBar({
  currentExp,
  nextLevelExp,
}: {
  currentExp: number
  nextLevelExp: number
}) {
  const [barWidth, setBarWidth] = useState<number>(0)
  const barProgressPercent = (currentExp / nextLevelExp) * 100

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 24,
      }}
    >
      <MaterialIcons
        name="accessible_forward"
        size={32}
        color={COLORS.magenta[500]}
        style={{
          left:
            barProgressPercent * 0.01 * barWidth < 20
              ? 20
              : `${barProgressPercent}%`,
          marginLeft: -28,
          marginBottom: -1,
        }}
      />
      <View
        onLayout={(e) => {
          setBarWidth(e.nativeEvent.layout.width)
        }}
        style={{
          height: 8,
          backgroundColor: COLORS.soap[100],
          borderRadius: 96,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: 8,
            width: `${barProgressPercent}%`,
            backgroundColor: COLORS.magenta[500],
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.LSTH_BOLD,
            fontSize: 12,
            color: COLORS['french-vanilla'][500],
          }}
        >
          <Text
            style={{
              color: COLORS.magenta[500],
            }}
          >
            XP {currentExp}
          </Text>
          /{nextLevelExp}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.LSTH_BOLD,
            fontSize: 12,
            color: COLORS['french-vanilla'][500],
          }}
        >
          <Text
            style={{
              color: COLORS.magenta[500],
            }}
          >
            {nextLevelExp - currentExp} XP
          </Text>{' '}
          เพื่ออัปเลเวล
        </Text>
      </View>
    </View>
  )
}
