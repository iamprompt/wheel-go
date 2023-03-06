import { Icon } from '@iconify/react'
import type { FC } from 'react'

interface PlaceItemProps {
  title: string
  rating: number
  date: string
}

export const PlaceItemWithRating: FC<PlaceItemProps> = ({
  title,
  rating,
  date,
}) => {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-3">
      <div className="flex flex-row items-center gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-4 border-info-400 bg-french-vanilla-100 shadow-2">
          <Icon
            icon="ic:baseline-apartment"
            className="h-4 w-4 text-info-400"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-body-m">{title}</div>
          <div className="flex flex-row items-center divide-x divide-soap-100">
            <div className="flex flex-row items-center gap-1 pr-2 text-title-s text-magenta-500">
              {rating}{' '}
              <Icon
                icon="ic:baseline-star"
                className="h-4 w-4 text-warning-300"
              />
            </div>
            <div className="pl-2 text-subtext-m text-french-vanilla-500">
              {date}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Icon
          icon="ic:baseline-chevron-right"
          className="h-6 w-6 text-french-vanilla-300"
        />
      </div>
    </div>
  )
}
