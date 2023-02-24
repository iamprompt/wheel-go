import { Icon } from '@iconify/react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'

const buttonVariants = cva(
  ['ui-text-title-s', 'ui-rounded-m', 'ui-px-6', 'ui-py-3'],
  {
    variants: {
      appearance: {
        primary: [
          'ui-text-french-vanilla-100',
          'disabled:ui-bg-french-vanilla-200',
          'disabled:ui-text-french-vanilla-300',
        ],
        secondary: [
          'ui-border',
          'ui-bg-french-vanilla-100',
          'disabled:ui-bg-french-vanilla-200',
          'disabled:ui-text-french-vanilla-300',
        ],
        dashed: ['ui-border', 'ui-border-dashed', 'ui-bg-french-vanilla-100'],
        danger: [
          'ui-border',
          'ui-bg-french-vanilla-100',
          'disabled:ui-bg-french-vanilla-200',
          'disabled:ui-text-french-vanilla-300',
        ],
      },
      state: {
        active: [],
        inactive: [],
      },
    },
    defaultVariants: {
      appearance: 'primary',
      state: 'inactive',
    },
    compoundVariants: [
      {
        appearance: 'primary',
        state: 'inactive',
        class: [
          'ui-bg-magenta-500',
          'focus:ui-bg-magenta-400',
          'hover:ui-bg-magenta-400',
          'hover:ui-shadow-2',
        ],
      },
      {
        appearance: 'primary',
        state: 'active',
        class: ['ui-bg-magenta-600'],
      },
      {
        appearance: ['secondary', 'dashed'],
        state: 'inactive',
        class: [
          'ui-border-french-vanilla-300',
          'ui-text-magenta-600',
          'hover:ui-border-magenta-500',
          'hover:ui-text-magenta-500',
          'focus:ui-border-magenta-500',
          'focus:ui-text-magenta-500',
          'focus:ui-shadow-2',
        ],
      },
      {
        appearance: ['secondary', 'dashed'],
        state: 'active',
        class: ['ui-border-magenta-600', 'ui-text-magenta-600'],
      },
      {
        appearance: ['danger'],
        state: 'inactive',
        class: [
          'ui-border-error-500',
          'ui-text-error-500',
          'hover:ui-border-error-600',
          'hover:ui-text-error-600',
          'focus:ui-shadow-2',
        ],
      },
      {
        appearance: ['danger'],
        state: 'active',
        class: ['ui-border-error-600', 'ui-text-error-600'],
      },
    ],
  }
)

type ButtonProps = VariantProps<typeof buttonVariants> &
  Omit<React.ComponentProps<'button'>, 'children'> & {
    label: string
    icon?: string
    iconPosition?: 'left' | 'right'
  }

export const Button: React.FC<ButtonProps> = ({
  appearance,
  state,
  label,
  className,
  icon,
  iconPosition = 'right',
  ...props
}) => {
  const IconElement = icon && <Icon icon={icon} className="ui-h-6 ui-w-6" />

  return (
    <button
      className={clsx(
        buttonVariants({
          appearance,
          state,
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
