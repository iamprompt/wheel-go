import type { ComponentProps, FC } from 'react'

import clsx from 'clsx'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

interface GroupWrapperProps extends ComponentProps<'div'> {
  title: string
  description?: string
  latestUpdated?: string
  required?: boolean
  withAsterisk?: boolean
  large?: boolean
  small?: boolean
}

export const GroupWrapper: FC<GroupWrapperProps> = ({
  children,
  title,
  description,
  latestUpdated,
  className,
  required = false,
  withAsterisk = false,
  large = false,
  small = false,
}) => {
  const { t } = useTranslation('table')
  const date = dayjs(latestUpdated)
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <div
            className={clsx(
              large ? 'text-title-xl' : small ? 'text-title-m' : 'text-title-l',
              'text-magenta-600',
            )}
          >
            {title}
            {withAsterisk && <span className="text-error-400"> *</span>}
          </div>
          {description && (
            <div
              className={clsx(
                large ? 'text-body-l' : small ? 'text-body-s' : 'text-body-m',
                'text-french-vanilla-500',
              )}
            >
              {description}
              {latestUpdated &&
                ` (Last edit ${date.format('DD/MM/YY')} at
              ${date.format('HH:mm')})`}
            </div>
          )}
        </div>
        {required && (
          <div className="text-body-m">
            <span className="text-error-500">*</span>
            <span className="text-french-vanilla-500">{t('required')}</span>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
