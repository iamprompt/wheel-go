import * as React from 'react'

import { Icon } from '@iconify/react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const buttonVariants = cva(
  [
    'text-title-s',
    'rounded-m',
    'px-2',
    'py-2',
    'disabled:cursor-not-allowed',
    'disabled:border-none',
    'font-sans',
  ],
  {
    variants: {
      appearance: {
        primary: [
          'text-french-vanilla-100',
          'border-none',
          'disabled:bg-french-vanilla-200',
          'disabled:text-french-vanilla-300',
        ],
        secondary: [
          'border',
          'border-solid',
          'bg-french-vanilla-100',
          'disabled:bg-french-vanilla-200',
          'disabled:text-french-vanilla-300',
        ],
        dashed: ['border', 'border-dashed', 'bg-french-vanilla-100'],
        danger: [
          'border',
          'bg-french-vanilla-100',
          'disabled:bg-french-vanilla-200',
          'disabled:text-french-vanilla-300',
        ],
        none: ['border-none', 'bg-transparent'],
      },
      state: {
        active: [],
        inactive: [],
      },
      cursorPointer: {
        true: ['cursor-pointer'],
        false: [],
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
          'bg-magenta-500',
          'focus:bg-magenta-400',
          'hover:bg-magenta-400',
          'hover:shadow-2',
        ],
      },
      {
        appearance: 'primary',
        state: 'active',
        class: ['bg-magenta-600'],
      },
      {
        appearance: ['secondary', 'dashed'],
        state: 'inactive',
        class: [
          'border-french-vanilla-300',
          'text-magenta-600',
          'hover:border-magenta-500',
          'hover:text-magenta-500',
          'focus:border-magenta-500',
          'focus:text-magenta-500',
        ],
      },
      {
        appearance: ['secondary', 'dashed'],
        state: 'active',
        class: ['border-magenta-600', 'text-magenta-600'],
      },
      {
        appearance: ['danger'],
        state: 'inactive',
        class: [
          'border-error-500',
          'text-error-500',
          'hover:border-error-600',
          'hover:text-error-600',
          'focus:shadow-2',
        ],
      },
      {
        appearance: ['danger'],
        state: 'active',
        class: ['border-error-600', 'text-error-600'],
      },
    ],
  },
)

type ButtonProps = VariantProps<typeof buttonVariants> &
  Omit<
    React.ComponentProps<'button'> & React.ComponentProps<'a'>,
    'children'
  > & {
    label?: string
    icon?: string
    iconPosition?: 'left' | 'right'
    as?: React.ElementType
  }

export const Button: React.FC<ButtonProps> = ({
  appearance,
  state,
  label = '',
  className,
  cursorPointer,
  icon,
  iconPosition = 'right',
  as: AsComponent = 'button',
  ...props
}) => {
  const IconElement = icon && <Icon icon={icon} className="h-6 w-6" />

  return (
    <AsComponent
      className={clsx(
        buttonVariants({
          appearance,
          state,
          cursorPointer,
        }),
        'flex items-center justify-center gap-x-2',
        className,
      )}
      {...props}
    >
      {iconPosition === 'left' && IconElement}
      {label}
      {iconPosition === 'right' && IconElement}
    </AsComponent>
  )
}
