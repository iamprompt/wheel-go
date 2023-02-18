import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  ['ui-text-title-s', 'ui-rounded-m', 'ui-px-6', 'ui-py-3'],
  {
    variants: {
      appearance: {
        primary: ['ui-bg-magenta-500', 'ui-text-french-vanilla-100'],
        secondary: [
          'ui-bg-french-vanilla-100',
          'ui-border',
          'ui-border-french-vanilla-300',
          'ui-text-magenta-600',
        ],
        dashed: ['ui-border', 'ui-border-dashed'],
        danger: [
          'ui-bg-french-vanilla-100',
          'ui-border',
          'ui-border-error-500',
          'ui-text-error-500',
        ],
      },
    },
    defaultVariants: {
      appearance: 'primary',
    },
    compoundVariants: [],
  }
)

type ButtonProps = VariantProps<typeof buttonVariants> &
  React.ComponentProps<'button'>

export const Button: React.FC<ButtonProps> = ({ appearance, ...props }) => {
  return (
    <button
      className={buttonVariants({
        appearance,
      })}
      {...props}
    >
      Boop
    </button>
  )
}
