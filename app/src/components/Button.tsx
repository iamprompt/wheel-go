import type { ComponentProps, FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { PressableProps } from 'react-native'
import { Pressable, Text } from 'react-native'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Dash = 'dash',
  Danger = 'danger',
  Text = 'text',
}

type ButtonProps = {
  variant?: ButtonVariant
  label: string
  fullWidth?: boolean
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  icon?: ComponentProps<typeof MaterialIcons>['name']
  iconPosition?: 'left' | 'right'
} & Omit<PressableProps, 'style'>

const Button: FC<ButtonProps> = ({
  variant = ButtonVariant.Primary,
  label,
  fullWidth = false,
  backgroundColor,
  borderColor,
  textColor,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const { t } = useTranslation()
  const BackgroundColor =
    backgroundColor ||
    (variant === ButtonVariant.Primary
      ? COLORS.magenta[500]
      : variant === ButtonVariant.Secondary
      ? COLORS['french-vanilla'][100]
      : variant === ButtonVariant.Dash
      ? COLORS['french-vanilla'][100]
      : variant === ButtonVariant.Danger
      ? COLORS['french-vanilla'][100]
      : undefined)

  const BorderColor =
    borderColor ||
    (variant === ButtonVariant.Primary
      ? COLORS.magenta[500]
      : variant === ButtonVariant.Secondary
      ? COLORS['french-vanilla'][300]
      : variant === ButtonVariant.Dash
      ? COLORS['french-vanilla'][300]
      : variant === ButtonVariant.Danger
      ? COLORS.error[500]
      : variant === ButtonVariant.Text
      ? 'transparent'
      : undefined)

  const TextColor =
    textColor ||
    (variant === ButtonVariant.Primary
      ? COLORS.white
      : variant === ButtonVariant.Danger
      ? COLORS.error[500]
      : COLORS.magenta[600])

  const BorderStyle = variant === ButtonVariant.Dash ? 'dashed' : 'solid'

  const IconElement = icon ? (
    <MaterialIcons name={icon} size={24} color={TextColor} />
  ) : null

  return (
    <Pressable
      {...props}
      style={{
        flex: fullWidth ? 1 : 0,
        flexDirection: 'row',
        gap: 8,
        borderRadius: 12,
        height: 48,
        paddingHorizontal: 16,
        // Set Content Alignment to Center
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        // Set Background Color according to variant
        backgroundColor: BackgroundColor,
        borderColor: BorderColor,
        borderWidth: 1,
        borderStyle: BorderStyle,
      }}
    >
      {icon && iconPosition === 'left' && IconElement}
      <Text
        style={{
          fontFamily: FONTS.LSTH_BOLD,
          fontSize: 16,
          color: TextColor,
        }}
      >
        {t(label)}
      </Text>
      {icon && iconPosition === 'right' && IconElement}
    </Pressable>
  )
}

export default Button
