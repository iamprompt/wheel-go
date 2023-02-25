import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { MAnnouncements } from '@/utils/mock'

export const DetailAnnouncementPage = () => {
  const { id } = useParams<{ id: string }>()
  const { i18n } = useTranslation()
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
      <div className="relative aspect-[2/1] w-full max-h-40">
        <img
          src={item.images[0]}
          className="w-full object-cover object-center h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
      </div>
      <div className="px-4 divide-y divide-soap-100">
        <section className="py-6">
          <div className="mb-2">
            <div className="text-title-l mb-2">{item.title}</div>
            <div className="text-body-m">{item.location}</div>
          </div>
          <div className="flex flex-row divide-x divide-soap-100 text-body-s text-french-vanilla-500">
            <div className="pr-2">{date.format('DD MMMM YYYY')}</div>
            <div className="pl-2">{date.format('HH:mm')}</div>
          </div>
          <div className="mt-2 flex flex-row gap-3">
            {item.tags.map((item) => (
              <div
                key={item}
                className="rounded-full bg-french-vanilla-300 px-2 py-1 text-center text-body-s text-french-vanilla-500"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
        <section className="py-6">
          <div className="text-title-s mb-3">รายละเอียด</div>
          <div className="text-body-s">{item.details}</div>
          <div className="flex flex-row gap-3 mt-3">
            {item.images.map((image) => (
              <div
                key={image}
                className="w-full rounded-s overflow-hidden border border-french-vanilla-300"
              >
                <img src={image} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
        <section className="py-6">
          <div className="text-title-s mb-3">ข้อมูลการติดต่อ</div>
          <ul>
            {Object.entries(item.contact).map(([key, value]) => (
              <li
                key={key}
                className="py-2 flex flex-row justify-between items-baseline"
              >
                <div className="text-title-xs text-french-vanilla-500">
                  {key}
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
