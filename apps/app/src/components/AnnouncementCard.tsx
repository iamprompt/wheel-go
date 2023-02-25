import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import type { FC } from 'react'

interface AnnouncementItemProps {
  title: string
  location: string
  tags: string[]
  timestamp: string
}

export const AnnouncementCard: FC<AnnouncementItemProps> = ({
  title,
  location,
  tags,
  timestamp,
}) => {
  const date = dayjs(timestamp)

  return (
    <div className="flex flex-row gap-3 items-start py-6 px-4 border-y border-soap-100">
      <div className="w-6 shrink-0">
        <Icon icon="ic:baseline-campaign" className="text-error-500 w-6 h-6" />
      </div>
      <div className="flex-1">
        <div className="text-title-xs">{title}</div>
        <div className="text-body-s">{location}</div>
        <div className="flex flex-row divide-x divide-soap-100 text-french-vanilla-500 text-subtext-s">
          <div className="pr-2">{date.format('DD MMMM YYYY')}</div>
          <div className="pl-2">{date.format('HH:mm')}</div>
        </div>
        <div className="mt-2 flex flex-row gap-3">
          {tags.map((item) => (
            <div
              key={item}
              className="px-2 py-1 text-body-s text-center text-french-vanilla-500 bg-french-vanilla-300 rounded-full"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="w-6 shrink-0">
        <Icon
          icon="ic:baseline-chevron-right"
          className="text-french-vanilla-300 w-6 h-6"
        />
      </div>
    </div>
  )
}
