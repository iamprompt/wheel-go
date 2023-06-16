import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import FONTS from '~/styles/fonts'

interface FieldLabelProps {
  label: string
}

export function FieldLabel({ label }: FieldLabelProps) {
  const { t } = useTranslation()

  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.LSTH_BOLD,
          fontSize: 16,
          marginBottom: 8,
        }}
      >
        {t(label)}
      </Text>
    </View>
  )
}
