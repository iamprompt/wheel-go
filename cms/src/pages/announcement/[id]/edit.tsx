import type { FC } from 'react'
import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'
import cloneDeep from 'lodash.clonedeep'
import omit from 'lodash.omit'
import { useTranslation } from 'react-i18next'

import { AnnouncementForm } from '~/components/AnnouncementForm'
import {
  useGetAnnouncementByIdQuery,
  type CreateAnnouncementInput,
} from '~/generated-types'

const EditAnnouncement: FC = () => {
  const router = useRouter()
  const id = router.query.id as string
  const {
    error: _error,
    loading: _loading,
    data,
  } = useGetAnnouncementByIdQuery({
    variables: { id },
  })
  const initialValues = {
    ...omit(cloneDeep(data?.getAnnouncementById), [
      'id',
      'createdAt',
      'updatedAt',
    ]),
    location: cloneDeep(data?.getAnnouncementById.location) ?? {
      lat: undefined,
      lng: undefined,
    },
    place: data?.getAnnouncementById.place?.id,
  }

  const { t } = useTranslation('announcement')
  return (
    <div>
      <div className="mb-6 flex items-center space-x-2">
        <a href="/announcement" className="no-underline">
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
        <AnnouncementForm
          title={t('edit')}
          description={t('edit_description')}
          announcementId={id as string}
          initialValues={initialValues as CreateAnnouncementInput}
          discard
          update
          unPublish
          remove
        />
      )}
    </div>
  )
}

export default EditAnnouncement
