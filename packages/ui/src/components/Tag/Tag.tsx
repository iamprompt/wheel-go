import { Icon } from '@iconify/react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'

const tagVariants = cva(['ui-rounded-m', 'ui-px-2', 'ui-py-1'], {
  variants: {
    color: {
      info: ['ui-text-info-400'],
      indigo: ['ui-text-indigo-500'],
      toast: ['ui-text-toast-500'],
      pomegranate: ['ui-text-pomegranate-400'],
      'fruit-punch': ['ui-text-fruit-punch-600'],
      lime: ['ui-text-lime-400'],
      warning: ['ui-text-warning-400'],
      default: ['ui-text-magenta-600'],
    },
    state: {
      available: [
        'ui-bg-french-vanilla-100',
        'ui-border',
        'ui-border-french-vanilla-300',
      ],
      selected: [
        'ui-bg-french-vanilla-100',
        'ui-border',
        'ui-border-magenta-500',
      ],
      unselected: [
        'ui-bg-french-vanilla-100',
        'ui-border',
        'ui-border-french-vanilla-300',
        '!ui-text-french-vanilla-300',
      ],
      disabled: [
        'ui-bg-french-vanilla-200',
        'ui-border',
        'ui-border-french-vanilla-300',
        '!ui-text-french-vanilla-300',
      ],
    },
    compact: {
      true: 'ui-text-title-xxs',
      false: 'ui-text-title-xs',
    },
  },
  defaultVariants: {
    color: 'default',
    state: 'available',
  },
})

type TagProps = VariantProps<typeof tagVariants> &
  Omit<React.ComponentProps<'button'>, 'children'> & {
    label: string
    icon?: string
    iconPosition?: 'left' | 'right'
  }

export const Tag: React.FC<TagProps> = ({
  color,
  state,
  compact = false,
  label,
  icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  const IconElement = icon && (
    <Icon icon={icon} className={compact ? 'ui-h-4 ui-w-4' : 'ui-h-6 ui-w-6'} />
  )
  return (
    <button
      className={clsx(
        tagVariants({
          color,
          state,
          compact,
        }),
        'ui-flex ui-items-center ui-justify-center ui-gap-x-2',
        className
      )}
      {...props}
    >
      {iconPosition === 'left' && IconElement}
      {label}
      {iconPosition === 'right' && IconElement}
    </button>
  )
}
