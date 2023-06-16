import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'
import { Image, Modal, Switch, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { ratingText } from '~/utils/calculate'
import { Button } from '~/components/Button'
import { GroupWrapper } from '~/components/GroupWrapper'
import { Tag } from '~/components/Tag'
import { Facilities } from '~/const/Facility'
import {
  Facility_Types,
  useDeleteReviewMutation,
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
  type CreateReviewInput,
  type Media,
} from '~/generated-types'
import type { RatingObject } from '~/types/RatingObject'

export function ReviewDetails() {
  const router = useRouter()
  const id = router.query.id as string
  const {
    error: _error,
    loading: _loading,
    data,
  } = useGetReviewByIdQuery({
    variables: { id },
  })

  const [UpdateReview, { error: updateError }] = useUpdateReviewMutation()
  const [DeleteReview, { error: deleteError }] = useDeleteReviewMutation()

  const updateReview = (id: string, data: CreateReviewInput) => {
    UpdateReview({
      variables: {
        id,
        review: data,
      },
    })

    if (updateError) {
      console.log(updateError)
    }
  }

  const deleteReview = (id: string) => {
    DeleteReview({
      variables: {
        id,
      },
    })

    if (deleteError) {
      console.log(deleteError)
    }
  }

  const review = data?.getReviewById

  const form = useForm({
    initialValues: {
      official: {
        comment: '',
        isFlagged: false,
      },
    },
  })

  useEffect(() => {
    form.setValues({
      official: {
        comment: review?.official?.comment ?? '',
        isFlagged: review?.official?.isFlagged ?? false,
      },
    })
  }, [review])

  const { t, i18n } = useTranslation('table')
  const { t: tFacility } = useTranslation('facility')
  const { t: tReview } = useTranslation('review')
  const { t: tAccessibility } = useTranslation('accessibility_level')
  const isEN = i18n.language === 'en'

  const isBuildingRating = review?.place?.type === 'BUILDING'

  const [updateOpened, { open: updateOpen, close: updateClose }] =
    useDisclosure(false)

  const [removeOpened, { open: removeOpen, close: removeClose }] =
    useDisclosure(false)
  const [removed, setRemoved] = useState(false)
  return (
    <>
      {review && (
        <GroupWrapper
          title={
            isEN ? review.place?.name?.en ?? '' : review.place?.name?.th ?? ''
          }
          className="items-start rounded-3xl bg-soap-100 p-6"
        >
          <Modal
            opened={updateOpened}
            onClose={updateClose}
            withCloseButton={false}
            centered
          >
            <div className="mb-4 mt-2 flex items-center justify-center gap-2 text-title-l text-success-400">
              <Icon
                icon="ep:success-filled"
                className="h-6 w-6 text-success-400"
              />
              {t('save_success')}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                appearance="secondary"
                label={t('close') as string}
                className="w-full cursor-pointer"
                onClick={updateClose}
              />
              <a href="/review" className="no-underline">
                <Button
                  type="button"
                  appearance="primary"
                  label={t('back') as string}
                  className="w-full cursor-pointer"
                />
              </a>
            </div>
          </Modal>
          <Modal
            opened={removeOpened}
            onClose={removeClose}
            centered
            withCloseButton={false}
          >
            <div className="flex flex-col gap-6">
              {removed && (
                <div className="mt-2 flex items-center justify-center gap-2 text-title-l text-error-500">
                  <Icon icon="mdi:trash" className="h-6 w-6 text-error-500" />
                  {t('remove_success')}
                </div>
              )}
              {removed && (
                <a href="/review">
                  <Button
                    appearance="primary"
                    label={t('back') as string}
                    className="w-full cursor-pointer py-3"
                  />
                </a>
              )}
              {!removed && (
                <div className="space-y-3">
                  <div className="py-2 text-title-l">{t('remove_prompt')}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      appearance="danger"
                      label={t('remove') as string}
                      className="w-full cursor-pointer"
                      icon="mdi:trash"
                      onClick={() => {
                        setRemoved(true)
                        deleteReview(id)
                      }}
                    />
                    <Button
                      appearance="primary"
                      label={t('discard') as string}
                      className="w-full cursor-pointer"
                      onClick={removeClose}
                    />
                  </div>
                </div>
              )}
            </div>
          </Modal>
          <form
            onSubmit={form.onSubmit((values, _event) => {
              const submitter = (_event as any).nativeEvent.submitter.name
              if (submitter === 'UPDATE') {
                const transformedValues = {
                  official: {
                    ...values.official,
                    timestamp: new Date().toISOString(),
                  },
                }
                id && updateReview(id, transformedValues)
                updateOpen()
              }
            })}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex gap-2">
              <div className="text-body-l text-french-vanilla-500">
                {tReview('by')}
              </div>
              <div className="text-body-l text-magenta-600">
                {review.user?.firstname} {review.user?.lastname}{' '}
                {review.user?.username ? `(${review.user?.username})` : null}
              </div>
              <div className="text-body-l text-french-vanilla-500">
                {' '}
                {tReview('on')}{' '}
              </div>
              <div className="text-body-l text-magenta-600">{`${dayjs(
                review.updatedAt,
              ).format('DD/MM/YY')} ${tReview('at')} ${dayjs(
                review.updatedAt,
              ).format('HH:mm')}`}</div>
            </div>
            <div className="flex items-center gap-2">
              <Tag
                label={review.rating?.overall?.toString() ?? ''}
                icon="ic:round-star"
                iconPosition="right"
                iconColor="text-warning-400"
                className=" border-solid text-title-xl"
                state="available"
                color="magenta"
              />
              <div className="text-body-m text-magenta-600">
                {tAccessibility(
                  ratingText(review.rating?.overall ?? 0) ?? 'level_0',
                )}
              </div>
            </div>

            {isBuildingRating && review.rating && (
              <div className="flex flex-wrap gap-4">
                {Object.values(Facility_Types).map((element) => {
                  const label = element.toLowerCase() as keyof RatingObject
                  return (
                    <Tag
                      key={element}
                      label={`${tFacility(element)}: ${
                        review.rating ? review.rating[label] ?? 0 : ''
                      }`}
                      icon={Facilities[element].icon}
                      iconColor="text-magenta-500"
                      state="available"
                      className="border-solid !text-magenta-500"
                    />
                  )
                })}
              </div>
            )}

            {!isBuildingRating && review.tags && review.tags.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {review.tags?.map((item: string) => (
                  <Tag
                    key={item}
                    label={tReview(item)}
                    state="available"
                    className="border-solid !text-body-m !text-magenta-500"
                  />
                ))}
              </div>
            )}

            {review.comment && (
              <div className="text-body-l text-magenta-600">{`"${review.comment}"`}</div>
            )}

            {review.images && (
              <div className="grid grid-cols-3 gap-6">
                {review.images.map((image: Media) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    className="overflow-hidden rounded-md"
                  />
                ))}
              </div>
            )}
            <Textarea
              label={tReview('additional_note')}
              placeholder={tReview('additional_note_placeholder') as string}
              autosize
              minRows={2}
              className="w-full"
              {...form.getInputProps('official.comment')}
            />
            <Switch
              label={tReview('flag')}
              checked={form.getInputProps('official.isFlagged').value}
              color="violet"
              {...form.getInputProps('official.isFlagged')}
            />
            <div className="mt-4 flex justify-between">
              <div className="flex gap-4">
                <a href="/review" className="no-underline">
                  <Button
                    type="button"
                    appearance="secondary"
                    className="cursor-pointer px-9 py-3"
                    label={t('discard') as string}
                  />
                </a>
                <Button
                  appearance="primary"
                  className="cursor-pointer px-9 py-3"
                  label={t('save') as string}
                  type="submit"
                  name={'UPDATE'}
                />
              </div>
              <Button
                appearance="danger"
                label={t('remove') as string}
                className="cursor-pointer px-6"
                icon="mdi:trash"
                onClick={removeOpen}
                type="button"
              />
            </div>
          </form>
        </GroupWrapper>
      )}
    </>
  )
}
