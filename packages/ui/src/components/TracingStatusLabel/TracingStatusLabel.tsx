import { Icon } from '@iconify/react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import clsx from 'clsx'
import type { FC } from 'react'

const TracingStatusLabelVariant = cva(
  'ui-flex ui-justify-center ui-items-center ui-p-3 ui-text-white ui-font-bold ui-rounded-m ui-gap-2 ui-shadow-2',
  {
    variants: {
      color: {
        error: 'ui-bg-error-500',
        warning: 'ui-bg-warning-500',
        magenta: 'ui-bg-magenta-500',
        success: 'ui-bg-success-500',
      },
    },
  }
)

interface TracingStatusLabelProps
  extends VariantProps<typeof TracingStatusLabelVariant> {
  className?: string
  label: string
  icon?: string | JSX.Element
  iconPosition?: 'left' | 'right'
}

export const TracingStatusLabel: FC<TracingStatusLabelProps> = ({
  label,
  icon,
  iconPosition = 'right',
  className,
  ...props
}) => {
  const IconElement = icon ? (
    typeof icon === 'string' ? (
      <Icon icon={icon} className="ui-w-6 ui-h-6" />
    ) : (
      icon
    )
  ) : null

  return (
    <div
      className={clsx('ui-w-full', TracingStatusLabelVariant(props), className)}
    >
      {iconPosition === 'left' && IconElement}
      {label}
      {iconPosition === 'right' && IconElement}
    </div>
  )
}
