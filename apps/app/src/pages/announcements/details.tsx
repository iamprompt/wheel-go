import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { Tag } from '@wheel-go/ui'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { MAnnouncements } from '@/utils/mock'
import { Categories } from '@/const/Category'

export const DetailAnnouncementPage = () => {
  const { id } = useParams<{ id: string }>()
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.language as 'en' | 'th'

  const item = MAnnouncements[currentLanguage].find(
    (announcement) => announcement.id === id
  )

  const date = useMemo(() => dayjs(item?.timestamp), [item?.timestamp])

  if (!item) {
    return null
  }

  return (
    <ActionTitleLayout
      header={{
        transparent: true,
      }}
      fullScreen
    >
      <div className="relative aspect-[2/1] max-h-40 w-full">
        <img
          src={item.images[0]}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
      </div>
      <div className="divide-y divide-soap-100 px-4">
        <section className="py-6">
          <div className="mb-2">
            <div className="mb-2 text-title-l">{item.title}</div>
            <div className="text-body-m">{item.location}</div>
          </div>
          <div className="flex flex-row divide-x divide-soap-100 text-body-s text-french-vanilla-500">
            <div className="pr-2">{date.format('DD MMMM YYYY')}</div>
            <div className="pl-2">{date.format('HH:mm')}</div>
          </div>
          <div className="mt-2 flex flex-row gap-3">
            {item.tags.map((item) => {
              const tag = Categories[item as keyof typeof Categories]

              return (
                <Tag
                  key={item}
                  label={t(`category:${tag.label}`)}
                  color={tag.color as Parameters<typeof Tag>[0]['color']}
                  state="available"
                  icon={tag.icon}
                  compact
                />
              )
            })}
          </div>
        </section>
        <section className="py-6">
          <div className="mb-3 text-title-s">{t('announcements:details')}</div>
          <div className="text-body-s">{item.details}</div>
          <div className="mt-3 flex flex-row gap-3">
            {item.images.map((image) => (
              <div
                key={image}
                className="w-full overflow-hidden rounded-s border border-french-vanilla-300"
              >
                <img src={image} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
        <section className="py-6">
          <div className="mb-3 text-title-s">{t('announcements:contact')}</div>
          <ul>
            {Object.entries(item.contact).map(([key, value]) => (
              <li
                key={key}
                className="flex flex-row items-baseline justify-between py-1"
              >
                <div className="text-title-xs text-french-vanilla-500">
                  {t(`announcements:contact_channel.${key}`)}
                </div>
                <div className="text-body-m text-magenta-500">{value}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ActionTitleLayout>
  )
}
