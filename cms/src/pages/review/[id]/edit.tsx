import type { FC } from 'react'

import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

import { ReviewDetails } from '~/components/ReviewDetails'

const EditReview: FC = () => {
  const { t } = useTranslation('review')
  return (
    <div>
      <div className="mb-6 flex items-center space-x-2">
        <a href="/review" className="no-underline">
          <div className="text-title-l text-french-vanilla-500 hover:text-magenta-600">
            {t('manage')}
          </div>
        </a>
        <Icon
          icon="ic:round-arrow-forward-ios"
          className="h-6 w-6 text-french-vanilla-500"
        />
        <div className="text-title-l text-magenta-500">{t('update')}</div>
      </div>
      <ReviewDetails />
    </div>
  )
}

export default EditReview
