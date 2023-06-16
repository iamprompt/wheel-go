import type { ComponentProps } from 'react'
import { TextInput, View } from 'react-native'

import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { FieldLabel } from './FieldLabel'

type WGTextInputProps = {
  name: string
  require?: boolean
  label?: string | null
  secureTextEntry?: boolean
} & Omit<ComponentProps<typeof TextInput>, 'name' | 'onBlur' | 'style'>

export function WGTextInput({
  name,
  require,
  label,
  onChange,
  value,
  ...props
}: WGTextInputProps) {
  return (
    <View>
      {label ? <FieldLabel label={label} /> : null}
      <TextInput
        onChange={onChange}
        value={value}
        autoCapitalize="none"
        placeholderTextColor={COLORS['french-vanilla'][300]}
        style={{
          borderWidth: 1,
          borderColor: COLORS['french-vanilla'][300],
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 24,
          fontFamily: FONTS.LSTH_REGULAR,
        }}
        {...props}
      />
    </View>
  )
}
