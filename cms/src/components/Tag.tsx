import * as React from 'react'

import { Icon } from '@iconify/react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const tagVariants = cva(
  ['rounded-m', 'px-2', 'py-1', 'disabled:cursor-not-allowed', 'font-sans'],
  {
    variants: {
      color: {
        info: ['text-info-400'],
        indigo: ['text-indigo-500'],
        toast: ['text-toast-500'],
        pomegranate: ['text-pomegranate-400'],
        'fruit-punch': ['text-fruit-punch-600'],
        lime: ['text-lime-400'],
        warning: ['text-warning-400'],
        mint: ['text-mint-600'],
        kiwi: ['text-kiwi-400'],
        magenta: ['text-magenta-500'],
        cantaloupe: ['text-cantaloupe-600'],
        jewel: ['text-jewel-600'],
        default: ['text-magenta-600'],
      },
      state: {
        available: [
          'bg-french-vanilla-100',
          'border',
          'border-french-vanilla-300',
        ],
        selected: ['bg-french-vanilla-100', 'border', 'border-magenta-500'],
        unselected: [
          'bg-french-vanilla-100',
          'border',
          'border-french-vanilla-300',
          '!text-french-vanilla-300',
        ],
        disabled: [
          'bg-french-vanilla-200',
          'border',
          'border-french-vanilla-300',
          '!text-french-vanilla-300',
        ],
      },
      compact: {
        true: 'text-title-xs',
        false: 'text-title-s',
      },
    },
    defaultVariants: {
      color: 'default',
      state: 'available',
    },
  },
)

type TagProps = VariantProps<typeof tagVariants> &
  Omit<React.ComponentProps<'button'>, 'children'> & {
    label: string
    icon?: string
    iconPosition?: 'left' | 'right'
    iconColor?: string
  }

export const Tag: React.FC<TagProps> = ({
  color,
  state,
  compact = false,
  label,
  icon,
  iconPosition = 'left',
  iconColor,
  className,
  ...props
}) => {
  const IconElement = icon && (
    <Icon
      icon={icon}
      className={
        compact ? clsx('h-4 w-4', iconColor) : clsx('h-6 w-6', iconColor)
      }
    />
  )
  return (
    <button
      className={clsx(
        tagVariants({
          color,
          state,
          compact,
        }),
        'flex items-center justify-center gap-x-2',
        className,
      )}
      {...props}
    >
      {iconPosition === 'left' && IconElement}
      {label}
      {iconPosition === 'right' && IconElement}
    </button>
  )
}
