import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { ActionTitleLayout } from '@/layouts/ActionTitle'

const RecordList = [
  {
    title: 'favorite-places',
    icon: 'ic:baseline-favorite-border',
    color: 'text-pomegranate-300',
    unit: 'places',
    to: '/records/favorites',
  },
  {
    title: 'place-reviews',
    icon: 'ic:baseline-star-outline',
    color: 'text-warning-400',
    unit: 'reviews',
    to: '/records/reviews',
  },
  {
    title: 'contributed-routes',
    icon: 'ic:baseline-route',
    color: 'text-success-400',
    unit: 'routes',
    to: '/records/routes',
  },
]

export const RecordPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('records')

  return (
    <ActionTitleLayout
      header={{
        title: t('title'),
        left: false,
      }}
      bottomNav={true}
    >
      <div className="px-4 py-6 text-title-s">{t('my-lists')}</div>
      <ul className="divide-y divide-soap-100 border border-soap-100">
        {RecordList.map((record) => (
          <li
            key={record.title}
            className="flex cursor-pointer flex-row items-center justify-between py-3 px-4"
            onClick={() => {
              navigate(record.to)
            }}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon
                icon={record.icon}
                className={clsx('h-6 w-6', record.color)}
              />
              <div>
                <div className="text-title-xs">{t(record.title)}</div>
                <div className="text-subtext-m text-french-vanilla-500">
                  3 {t(record.unit)}
                </div>
              </div>
            </div>
            <div>
              <Icon
                icon="ic:baseline-chevron-right"
                className="h-6 w-6 text-french-vanilla-300"
              />
            </div>
          </li>
        ))}
      </ul>
    </ActionTitleLayout>
  )
}
