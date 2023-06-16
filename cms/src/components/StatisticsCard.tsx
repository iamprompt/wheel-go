import type { ComponentProps, FC } from 'react'

import { Icon } from '@iconify/react'

import { cn } from '~/utils/classname'

interface StatisticsCardProps extends ComponentProps<'div'> {
  title: string
  icon?: string
  iconColor?: string
  current: number | string
  percentChange?: number
}

export const StatisticsCard: FC<StatisticsCardProps> = ({
  children,
  title,
  current,
  percentChange,
  icon,
  iconColor,
}) => {
  const positiveIcon = (
    <Icon
      icon="ic:baseline-arrow-upward"
      className="h-6 w-6 text-success-400"
    />
  )
  const negativeIcon = (
    <Icon
      icon="ic:baseline-arrow-downward"
      className="h-6 w-6 text-error-500"
    />
  )

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-solid border-french-vanilla-300 p-6">
      <div className="flex flex-row justify-between gap-2">
        <div className="text-title-xl text-magenta-600">{title}</div>
        {icon && <Icon icon={icon} className={cn('h-8 w-8', iconColor)} />}
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-title-xxl text-french-vanilla-500">{current}</div>
        {percentChange && (
          <div className="flex flex-row items-center gap-2 rounded-xl border border-solid border-french-vanilla-300 px-6 py-3">
            {percentChange > 0 && positiveIcon}
            {percentChange < 0 && negativeIcon}
            <div className="text-title-m">{Math.abs(percentChange)}%</div>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
