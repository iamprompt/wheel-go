import { Icon } from '@iconify/react'
import { Tag } from '@wheel-go/ui'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Categories } from '@/const/Category'

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
  const { t } = useTranslation('category')
  const date = dayjs(timestamp)

  return (
    <div className="flex flex-row items-start gap-3 border-y border-soap-100 py-6 px-4">
      <div className="w-6 shrink-0">
        <Icon icon="ic:baseline-campaign" className="h-6 w-6 text-error-500" />
      </div>
      <div className="flex-1">
        <div className="text-title-xs">{title}</div>
        <div className="text-body-s">{location}</div>
        <div className="flex flex-row divide-x divide-soap-100 text-subtext-s text-french-vanilla-500">
          <div className="pr-2">{date.format('DD MMMM YYYY')}</div>
          <div className="pl-2">{date.format('HH:mm')}</div>
        </div>
        <div className="mt-2 flex flex-row gap-3">
          {tags.map((item) => {
            const tag = Categories[item as keyof typeof Categories]

            return (
              <Tag
                key={item}
                label={t(tag.label)}
                color={tag.color as Parameters<typeof Tag>[0]['color']}
                state="available"
                icon={tag.icon}
                compact
              />
            )
          })}
        </div>
      </div>
      <div className="w-6 shrink-0">
        <Icon
          icon="ic:baseline-chevron-right"
          className="h-6 w-6 text-french-vanilla-300"
        />
      </div>
    </div>
  )
}
