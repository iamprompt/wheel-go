import type { FC } from 'react'

import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

import { PlaceForm } from '~/components/PlaceForm'
import type { CreatePlaceInput } from '~/generated-types'

const AddPlace: FC = () => {
  const { t } = useTranslation('place')

  const initialValues: CreatePlaceInput = {
    address: {
      en: '',
      th: '',
    },
    images: [],
    internalCode: null,
    location: {
      lat: null,
      lng: null,
    },
    metadata: {
      accessibility: undefined,
      busLines: [],
      phone: null,
      tramLines: [],
      website: null,
    },
    name: {
      en: '',
      th: '',
    },
    type: null,
  }

  return (
    <div>
      <div className="mb-6 flex items-center space-x-2">
        <a href="/place" className="no-underline">
          <div className="text-title-l text-french-vanilla-500 hover:text-magenta-600">
            {t('manage')}
          </div>
        </a>
        <Icon
          icon="ic:round-arrow-forward-ios"
          className="h-6 w-6 text-french-vanilla-500"
        />
        <div className="text-title-l text-magenta-500">{t('add')}</div>
      </div>
      <PlaceForm
        title={t('add')}
        description={t('add_description')}
        initialValues={initialValues}
        saveAsDraft
        publish
      />
    </div>
  )
}

export default AddPlace
