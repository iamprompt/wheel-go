import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

import COLORS from '~/styles/colors'
import Button from './Button'

type Props = Omit<
  ComponentProps<typeof Button>,
  | 'label'
  | 'backgroundColore'
  | 'textColor'
  | 'borderColor'
  | 'icon'
  | 'iconPosition'
>

export function TraceCTAButton({ ...props }: Props) {
  const { t } = useTranslation()

  return (
    <Button
      label={t('explore.trace_cta_button')}
      backgroundColor={COLORS.cyan[500]}
      borderColor={COLORS.cyan[500]}
      icon="accessible_forward"
      iconPosition="right"
      {...props}
    />
  )
}
