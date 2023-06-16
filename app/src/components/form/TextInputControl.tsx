import type { ComponentProps } from 'react'
import { Controller } from 'react-hook-form'
import { TextInput, View } from 'react-native'

import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { FieldLabel } from './FieldLabel'

type WGTextInputProps = {
  control: ComponentProps<typeof Controller>['control']
  name: ComponentProps<typeof Controller>['name']
  require?: boolean
  label?: string | null
  secureTextEntry?: boolean
} & Omit<
  ComponentProps<typeof TextInput>,
  'name' | 'onBlur' | 'onChangeText' | 'value' | 'style'
>

export function WGTextInputControl({
  name,
  control,
  require,
  label,
  ...props
}: WGTextInputProps) {
  return (
    <View>
      {label ? <FieldLabel label={label} /> : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
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
        )}
      />
    </View>
  )
}
