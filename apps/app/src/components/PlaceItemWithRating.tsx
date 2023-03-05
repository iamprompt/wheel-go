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
        <div className="bg-french-vanilla-100 inline-flex items-center justify-center h-8 w-8 border-4 border-info-400 shadow-2 rounded-full">
          <Icon
            icon="ic:baseline-apartment"
            className="w-4 h-4 text-info-400"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-body-m">{title}</div>
          <div className="flex flex-row divide-x divide-soap-100 items-center">
            <div className="flex flex-row gap-1 items-center pr-2 text-magenta-500 text-title-s">
              {rating}{' '}
              <Icon
                icon="ic:baseline-star"
                className="w-4 h-4 text-warning-300"
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
          className="w-6 h-6 text-french-vanilla-300"
        />
      </div>
    </div>
  )
}
