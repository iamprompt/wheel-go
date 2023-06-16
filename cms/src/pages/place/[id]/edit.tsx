import type { FC } from 'react'
import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'
import cloneDeep from 'lodash.clonedeep'
import omit from 'lodash.omit'
import { useTranslation } from 'react-i18next'

import { PlaceForm } from '~/components/PlaceForm'
import { useGetPlaceByIdQuery, type CreatePlaceInput } from '~/generated-types'

const AddPlace: FC = () => {
  const router = useRouter()
  const id = router.query.id as string
  const {
    error: _error,
    loading: _loading,
    data,
  } = useGetPlaceByIdQuery({ variables: { id } })
  const initialValues = omit(cloneDeep(data?.getPlaceById), [
    'id',
    'createdAt',
    'updatedAt',
  ])

  const { t } = useTranslation('place')
  return (
    <div>
      {/* <button onClick={() => console.log(data)}>data</button> */}
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
        <div className="text-title-l text-magenta-500">{t('edit')}</div>
      </div>
      {data && (
        <PlaceForm
          title={t('edit')}
          description={t('edit_description')}
          placeId={id as string}
          initialValues={initialValues as CreatePlaceInput}
          discard
          update
          unPublish
          remove
        />
      )}
    </div>
  )
}

export default AddPlace
