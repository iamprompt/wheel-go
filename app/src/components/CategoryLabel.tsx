import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { PLACE_TYPES_META } from '~/const/placeTypes'
import type { SURROUNDING_CONDITIONS } from '~/const/placeTypes'
import type { Place_Types } from '~/generated-types'

interface CategoryLabelProps {
  name?: Place_Types | SURROUNDING_CONDITIONS
}

export function CategoryLabel({ name }: CategoryLabelProps) {
  const { t } = useTranslation()

  if (!name) {
    return null
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderColor: COLORS['french-vanilla'][300],
        borderWidth: 1,
        borderRadius: 8,
      }}
    >
      <MaterialIcons
        name={PLACE_TYPES_META[name].icon}
        color={PLACE_TYPES_META[name].color}
        size={16}
      />
      <Text
        style={{
          fontFamily: FONTS.LSTH_BOLD,
          fontSize: 12,
          color: PLACE_TYPES_META[name].color,
        }}
      >
        {t(PLACE_TYPES_META[name].label)}
      </Text>
    </View>
  )
}
