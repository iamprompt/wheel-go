import { useRouter } from 'expo-router'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { FieldLabel } from './FieldLabel'

type WGInputLinkProps = {
  name: string
  require?: boolean
  label?: string | null
  value?: string
  placeholder?: string
  href: string
} & Omit<ComponentProps<typeof Pressable>, 'onPress' | 'style'>

export function WGInputLink({
  name,
  require,
  label,
  value,
  placeholder,
  href,
  ...props
}: WGInputLinkProps) {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <View>
      {label ? <FieldLabel label={label} /> : null}
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: COLORS['french-vanilla'][300],
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 24,
        }}
        onPress={() => {
          router.push(href)
        }}
        {...props}
      >
        <Text
          style={{
            fontFamily: FONTS.LSTH_REGULAR,
            color: !value ? COLORS['french-vanilla'][300] : undefined,
            flex: 1,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {t(value || placeholder || '')}
        </Text>
        <MaterialIcons
          name="chevron_right"
          size={24}
          color={COLORS['french-vanilla'][300]}
          style={{
            marginLeft: 12,
          }}
        />
      </Pressable>
    </View>
  )
}
