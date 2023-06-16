import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const statusTagVariants = cva(
  ['text-title-s', 'rounded-m', 'w-[125px]', 'py-2', 'font-sans'],
  {
    variants: {
      state: {
        PUBLISHED: [
          'bg-success-100',
          'text-success-500',
          'border',
          'border-solid',
          'border-success-600',
        ],
        DRAFT: [
          'bg-info-100',
          'text-info-500',
          'border',
          'border-solid',
          'border-info-600',
        ],
        UNPUBLISHED: [
          'bg-error-100',
          'text-error-500',
          'border',
          'border-solid',
          'border-error-600',
        ],
      },
    },
    defaultVariants: {
      state: 'DRAFT',
    },
  },
)

type StatusTagProps = VariantProps<typeof statusTagVariants> &
  Omit<React.ComponentProps<'button'>, 'children'> & {
    label: string
    state: string
  }

export const StatusTag: React.FC<StatusTagProps> = ({
  state,
  label,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        statusTagVariants({
          state,
        }),
        'flex items-center justify-center gap-x-2',
        className,
      )}
      {...props}
    >
      {label}
    </button>
  )
}
