import { useEffect, useState, type FC } from 'react'

import { Icon } from '@iconify/react'
import {
  Group,
  Image,
  Modal,
  MultiSelect,
  Select,
  Switch,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, type FileWithPath } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next'

import { cn } from '~/utils/classname'
import { transitionProps } from '~/utils/transitionProps'
import { Button } from '~/components/Button'
import { useStyles } from '~/components/DropzoneStyles'
import { FacilitiesInfo } from '~/components/FacilitiesInfo'
import { GroupWrapper } from '~/components/GroupWrapper'
import { Tag } from '~/components/Tag'
import { WGMapMarker } from '~/components/WGMapMarker'
import { Categories } from '~/const/Category'
import type { Color } from '~/const/Color'
import accessibilityStatusOptions from '~/data/accessibilityStatusOptions.json'
import busLineOptions from '~/data/busLineOptions.json'
import curbcutStatusOptions from '~/data/curbcutStatusOptions.json'
import tramLineOptions from '~/data/tramLineOptions.json'
import {
  Place_Types,
  Status,
  useCreatePlaceMutation,
  useDeletePlaceMutation,
  useGetPlacesQuery,
  useUpdatePlaceMutation,
  useUploadMediaMutation,
  type CreatePlaceInput,
  type UploadMediaMutation,
} from '~/generated-types'

interface PlaceFormProps {
  placeId?: string
  title: string
  description: string
  latestUpdated?: string
  initialValues: CreatePlaceInput
  publish?: boolean
  saveAsDraft?: boolean
  discard?: boolean
  update?: boolean
  unPublish?: boolean
  remove?: boolean
}

export const PlaceForm: FC<PlaceFormProps> = ({
  placeId,
  initialValues,
  title,
  description,
  latestUpdated,
  publish,
  saveAsDraft,
  discard,
  update,
  unPublish,
  remove,
}) => {
  // Language Handling
  const { t, i18n } = useTranslation('table')
  const { t: tPlace } = useTranslation('place')
  const { t: tCat } = useTranslation('category')
  const { t: tValidate } = useTranslation('validation')
  const { t: tImage } = useTranslation('image')

  // Data Handling
  const {
    error: _error,
    loading: _loading,
    data: placesData,
  } = useGetPlacesQuery()
  const [CreatePlace, { error: createError }] = useCreatePlaceMutation()
  const [UpdatePlace, { error: updateError }] = useUpdatePlaceMutation()
  const [DeletePlace, { error: deleteError }] = useDeletePlaceMutation()
  const [UploadMedia, { error: _uploadError }] = useUploadMediaMutation()
  const addPlace = (data: CreatePlaceInput) => {
    CreatePlace({
      variables: {
        data,
      },
    })
    if (createError) {
      console.log(createError)
    }
  }
  const updatePlace = (id: string, data: CreatePlaceInput) => {
    UpdatePlace({
      variables: {
        id,
        data,
      },
    })
    if (updateError) {
      console.log(updateError)
    }
  }
  const removePlace = (id: string) => {
    DeletePlace({
      variables: {
        id,
      },
    })

    if (deleteError) {
      console.log(deleteError)
    }
  }

  // Form Handling
  const form = useForm({
    initialValues,
    validate: {
      location: (value: any) =>
        Number(value.lat) && Number(value.lng)
          ? isFinite(value.lat) && Math.abs(value.lat) <= 90
            ? isFinite(value.lng) && Math.abs(value.lng) <= 180
              ? null
              : tValidate('longitude')
            : tValidate('latitude')
          : tValidate('geolocation'),
      metadata: {
        website: (value: any) =>
          value
            ? value.match(/(www|http:|https:)+[^\s]+[\w]/)
              ? null
              : tValidate('website')
            : null,
      },
    },
    transformValues: (values) => ({
      ...values,
      location: {
        lat: values.location?.lat?.toString(),
        lng: values.location?.lng?.toString(),
      },
    }),
  })

  // Image Handling
  const { classes } = useStyles()
  const [files, setFiles] = useState<UploadMediaMutation[]>([])
  const [uploadedFiles, setUploadedFiles] = useState(initialValues.images ?? [])

  const onDrop = async (images: FileWithPath[]) => {
    const uploadResults: any = await Promise.all(
      images.map(async (image) => {
        try {
          const result = await UploadMedia({
            variables: {
              file: image,
            },
          })
          return result.data
        } catch (error) {
          console.log('error', error)
          throw error
        }
      }),
    )
    setFiles([...uploadResults, ...files])
  }

  const previews = files?.map((file, index) => {
    const imageId = file.uploadMedia?.id
    const imageUrl = file.uploadMedia?.url
    const imageName = file.uploadMedia?.filename
    return (
      <div key={index} className="relative">
        <Image src={imageUrl} />
        <div>{imageName}</div>
        <Button
          type="button"
          appearance="danger"
          className="absolute right-2 top-2 cursor-pointer"
          icon="mdi:trash"
          onClick={() =>
            setFiles(files.filter((item) => item.uploadMedia.id !== imageId))
          }
        />
      </div>
    )
  })

  const uploadedPreviews = uploadedFiles?.map((file: any, index) => {
    const imageId = file.id
    const imageUrl = file.url
    const imageName = file.filename
    return (
      <div key={index} className="relative">
        <Image src={imageUrl} />
        <div>{imageName}</div>
        <Button
          type="button"
          appearance="danger"
          className="absolute right-2 top-2 cursor-pointer"
          icon="mdi:trash"
          onClick={() =>
            setUploadedFiles(
              uploadedFiles.filter((item: any) => item.id !== imageId),
            )
          }
        />
      </div>
    )
  })

  // Maps Handling
  const [showPin, setShowPin] = useState(true)

  const [selectedPosition, setSelectedPosition] = useState({
    lat: initialValues.location?.lat ?? null,
    lng: initialValues.location?.lng ?? null,
  })
  const [centerPosition, setCenterPosition] = useState({
    lat: initialValues.location?.lat ?? 13.794673028027479,
    lng: initialValues.location?.lng ?? 100.32292971800167,
  })
  const handleMarkerDragDrop = (e: any) => {
    setSelectedPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    })
    setCenterPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    })
  }
  useEffect(() => {
    form.setFieldValue('location.lat', selectedPosition.lat)
    form.setFieldValue('location.lng', selectedPosition.lng)
  }, [selectedPosition])

  // Modal Handling
  const [saveDraftOpened, { open: saveDraftOpen, close: saveDraftClose }] =
    useDisclosure(false)
  const [publishOpened, { open: publishOpen, close: publishClose }] =
    useDisclosure(false)
  const [updateOpened, { open: updateOpen, close: updateClose }] =
    useDisclosure(false)
  const [unpublishOpened, { open: unpublishOpen, close: unpublishClose }] =
    useDisclosure(false)
  const [removeOpened, { open: removeOpen, close: removeClose }] =
    useDisclosure(false)
  const [removed, setRemoved] = useState(false)

  return (
    <GroupWrapper
      title={title}
      description={description}
      latestUpdated={latestUpdated}
      className="space-y-6"
      required
      large
    >
      <Modal
        opened={saveDraftOpened}
        onClose={saveDraftClose}
        withCloseButton={false}
        centered
      >
        <div className="mb-4 mt-2 flex items-center justify-center gap-2 text-title-l text-info-400">
          <Icon icon="ep:success-filled" className="h-6 w-6 text-info-400" />
          {t('save_draft_success')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <a href="/place" className="col-span-2 no-underline">
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
        opened={publishOpened}
        onClose={publishClose}
        withCloseButton={false}
        centered
      >
        <div className="mb-4 mt-2 flex items-center justify-center gap-2 text-title-l text-success-400">
          <Icon icon="ep:success-filled" className="h-6 w-6 text-success-400" />
          {t('publish_success')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <a href="/place" className="col-span-2 no-underline">
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
        opened={updateOpened}
        onClose={updateClose}
        withCloseButton={false}
        centered
      >
        <div className="mb-4 mt-2 flex items-center justify-center gap-2 text-title-l text-success-400">
          <Icon icon="ep:success-filled" className="h-6 w-6 text-success-400" />
          {t('save_success')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            appearance="secondary"
            label={t('close') as string}
            className="w-full cursor-pointer"
            onClick={updateClose}
          />
          <a href="/place" className="no-underline">
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
        opened={unpublishOpened}
        onClose={unpublishClose}
        withCloseButton={false}
        centered
      >
        <div className="mb-4 mt-2 flex items-center justify-center gap-2 text-title-l text-info-400">
          <Icon icon="ep:success-filled" className="h-6 w-6 text-info-400" />
          {t('unpublish_success')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            appearance="secondary"
            label={t('close') as string}
            className="w-full cursor-pointer"
            onClick={unpublishClose}
          />
          <a href="/place" className="no-underline">
            <Button
              type="button"
              appearance="primary"
              label={t('back') as string}
              className="w-full cursor-pointer"
            />
          </a>
        </div>
      </Modal>
      <form
        onSubmit={form.onSubmit((transformValues, _event) => {
          const submitter = (_event as any).nativeEvent.submitter.name
          const images = [
            ...files.map((file) => file.uploadMedia.id),
            ...uploadedFiles.map((file: any) => file.id),
          ]

          if (submitter === 'PUBLISH') {
            addPlace({ ...transformValues, status: Status.Published, images })
            publishOpen()
          }
          if (submitter === 'PUBLISH_DRAFT') {
            addPlace({ ...transformValues, status: Status.Draft, images })
            saveDraftOpen()
          }
          if (submitter === 'UPDATE') {
            const currentValues = {
              ...transformValues,
              status: Status.Published,
              images,
            }
            placeId && updatePlace(placeId, currentValues)
            updateOpen()
          }
          if (submitter === 'SWITCH_TO_DRAFT') {
            const currentValues = {
              ...transformValues,
              status: Status.Draft,
              images,
            }
            placeId && updatePlace(placeId, currentValues)
            unpublishOpen()
          }
          // console.log(_event)
        })}
        className="space-y-6"
      >
        <GroupWrapper
          title={tPlace('category')}
          className="rounded-3xl bg-soap-100 p-6"
          withAsterisk
        >
          <div className="flex flex-col gap-2">
            <div className="mt-2 flex flex-wrap gap-4">
              {Object.values(Place_Types).map((element) => {
                return (
                  <Tag
                    key={element}
                    label={tCat(element)}
                    icon={Categories[element].icon}
                    color={Categories[element].color as Color}
                    state={
                      form.getInputProps('type').value === null
                        ? 'available'
                        : form.getInputProps('type').value === element
                        ? 'available'
                        : 'disabled'
                    }
                    disabled={form.getInputProps('type').value}
                    className="cursor-pointer border-solid hover:border hover:border-magenta-500"
                    onClick={() => {
                      form.getInputProps('type').value === null
                        ? form.setFieldValue('type', element)
                        : form.getInputProps('type').value === element
                        ? form.setFieldValue('type', null)
                        : form.setFieldValue('type', element)
                    }}
                  />
                )
              })}
            </div>
            {form.getInputProps('type').error && (
              <Text fz="xs" c="red">
                {form.getInputProps('type').error}
              </Text>
            )}
          </div>
        </GroupWrapper>
        {form.getInputProps('type').value !== 'CURBCUT' && (
          <GroupWrapper
            title={tPlace('place_name')}
            className="rounded-3xl bg-soap-100 p-6"
          >
            <div className="grid grid-cols-5 gap-6">
              <TextInput
                label={tPlace('place_name_en')}
                placeholder={tPlace('place_name_en_placeholder') as string}
                required
                withAsterisk
                disabled={form.getInputProps('type').value === null}
                className="col-span-2"
                {...form.getInputProps('name.en')}
              />
              <TextInput
                label={tPlace('place_name_th')}
                placeholder={tPlace('place_name_th_placeholder') as string}
                required
                withAsterisk
                disabled={form.getInputProps('type').value === null}
                className="col-span-2"
                {...form.getInputProps('name.th')}
              />
              <TextInput
                label={tPlace('internal_code')}
                placeholder={tPlace('internal_code_placeholder') as string}
                disabled={form.getInputProps('type').value === null}
                {...form.getInputProps('internalCode')}
              />
            </div>
          </GroupWrapper>
        )}
        <GroupWrapper
          title={tPlace('basic_information')}
          className="rounded-3xl bg-soap-100 p-6"
        >
          <div className="grid grid-cols-2 gap-6">
            {form.getInputProps('type').value !== 'TRANSPORT' &&
              form.getInputProps('type').value !== 'CURBCUT' && (
                <div className="grid grid-cols-2 gap-6">
                  <Textarea
                    label={tPlace('address_en')}
                    placeholder={tPlace('address_en_placeholder') as string}
                    autosize
                    minRows={2}
                    disabled={form.getInputProps('type').value === null}
                    {...form.getInputProps('address.en')}
                  />
                  <Textarea
                    label={tPlace('address_th')}
                    placeholder={tPlace('address_th_placeholder') as string}
                    autosize
                    minRows={2}
                    disabled={form.getInputProps('type').value === null}
                    {...form.getInputProps('address.th')}
                  />
                  <TextInput
                    label={tPlace('phone')}
                    placeholder={tPlace('phone_placeholder') as string}
                    className="col-span-2"
                    disabled={form.getInputProps('type').value === null}
                    {...form.getInputProps('metadata.phone')}
                  />
                  <TextInput
                    label={tPlace('website')}
                    placeholder={tPlace('website_placeholder') as string}
                    className="col-span-2"
                    disabled={form.getInputProps('type').value === null}
                    {...form.getInputProps('metadata.website')}
                  />
                  <Dropzone
                    onDrop={onDrop}
                    maxSize={10000000}
                    accept={IMAGE_MIME_TYPE}
                    className={cn(
                      form.getInputProps('type').value === null
                        ? classes.disabled
                        : '',
                      'col-span-2 h-max',
                    )}
                  >
                    <Group position="center" spacing="xl">
                      <Dropzone.Accept>
                        <Icon
                          icon="material-symbols:upload"
                          className="h-10 w-10"
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <Icon
                          icon="material-symbols:file-upload-off"
                          className="h-10 w-10"
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <Icon
                          icon="majesticons:image-plus-line"
                          className="h-10 w-10"
                        />
                      </Dropzone.Idle>

                      <div>
                        <Text size="md" inline>
                          {tImage('drag')}
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                          {tImage('description')}
                        </Text>
                      </div>
                    </Group>
                  </Dropzone>
                  {previews}
                  {uploadedPreviews}
                </div>
              )}
            {form.getInputProps('type').value === 'TRANSPORT' && (
              <div className="flex flex-col gap-6">
                <Select
                  label={tPlace('status')}
                  placeholder={tPlace('status_placeholder') as string}
                  required
                  withAsterisk
                  searchable
                  clearable
                  transitionProps={transitionProps}
                  data={
                    i18n.language === 'en'
                      ? accessibilityStatusOptions.data.en
                      : accessibilityStatusOptions.data.th
                  }
                  {...form.getInputProps('metadata.accessibility')}
                />
                <GroupWrapper
                  title={tPlace('accessible_channel')}
                  className="rounded-3xl bg-french-vanilla-100 p-6"
                >
                  <MultiSelect
                    data={busLineOptions.data}
                    searchable
                    clearable
                    nothingFound="No options"
                    label={tPlace('bus_line')}
                    placeholder={tPlace('bus_line_placeholder') as string}
                    transitionProps={transitionProps}
                    {...form.getInputProps('metadata.busLines')}
                  />
                  <MultiSelect
                    data={
                      i18n.language === 'en'
                        ? tramLineOptions.data.en
                        : tramLineOptions.data.th
                    }
                    searchable
                    clearable
                    nothingFound="No options"
                    label={tPlace('tram_line')}
                    placeholder={tPlace('tram_line_placeholder') as string}
                    transitionProps={transitionProps}
                    {...form.getInputProps('metadata.tramLines')}
                  />
                </GroupWrapper>
              </div>
            )}
            {form.getInputProps('type').value === 'CURBCUT' && (
              <Select
                label={tPlace('status')}
                placeholder={tPlace('status_placeholder') as string}
                required
                withAsterisk
                searchable
                clearable
                transitionProps={transitionProps}
                data={
                  i18n.language === 'en'
                    ? curbcutStatusOptions.data.en
                    : curbcutStatusOptions.data.th
                }
                {...form.getInputProps('metadata.accessibility')}
              />
            )}
            <GroupWrapper title={tPlace('geolocation')} small>
              <div className="grid grid-cols-2 gap-6">
                <TextInput
                  label={tPlace('latitude')}
                  placeholder={tPlace('latitude_placeholder') as string}
                  required
                  withAsterisk
                  disabled={form.getInputProps('type').value === null}
                  {...form.getInputProps('location.lat')}
                  error={form.errors.location}
                />
                <TextInput
                  label={tPlace('longitude')}
                  placeholder={tPlace('longitude_placeholder') as string}
                  required
                  withAsterisk
                  disabled={form.getInputProps('type').value === null}
                  {...form.getInputProps('location.lng')}
                  error={form.errors.location}
                />
              </div>
              <div className="relative mt-4 h-full min-h-[400px] w-full overflow-hidden rounded-lg bg-[#f1f3f5]">
                <Switch
                  label={t('togglePin')}
                  checked={showPin}
                  color="violet"
                  onChange={() => setShowPin(!showPin)}
                  disabled={form.getInputProps('type').value === null}
                  className="mb-4"
                />
                {form.getInputProps('type').value && (
                  <GoogleMap
                    /* @ts-expect-error @ts-ignore: center overload */
                    center={centerPosition}
                    zoom={16}
                    mapContainerClassName="w-full h-full"
                  >
                    {placesData?.getPlaces && showPin && (
                      <>
                        {placesData.getPlaces.map((place) => {
                          return (
                            <WGMapMarker
                              key={place.id}
                              coordinate={place.location ?? { lat: 0, lng: 0 }}
                              onPress={() => {
                                console.log(place.id)
                              }}
                              type={place.type || Place_Types.Building}
                            />
                          )
                        })}
                      </>
                    )}
                    <MarkerF
                      /* @ts-expect-error @ts-ignore: position overload */
                      position={centerPosition}
                      onDragEnd={handleMarkerDragDrop}
                      draggable
                    />
                  </GoogleMap>
                )}
              </div>
            </GroupWrapper>
          </div>
        </GroupWrapper>
        {placeId && form.getInputProps('type').value === 'BUILDING' && (
          <FacilitiesInfo placeId={placeId} />
        )}
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            {saveAsDraft && (
              <Button
                type="submit"
                appearance="secondary"
                className="cursor-pointer px-9 py-3"
                label={t('save_draft') as string}
                name={'PUBLISH_DRAFT'}
              />
            )}
            {publish && (
              <Button
                type="submit"
                appearance="primary"
                className="cursor-pointer px-9 py-3"
                label={t('publish') as string}
                name={'PUBLISH'}
              />
            )}
            {discard && (
              <a href="/place" className="no-underline">
                <Button
                  type="button"
                  appearance="secondary"
                  className="cursor-pointer px-9 py-3"
                  label={t('discard') as string}
                />
              </a>
            )}
            {update && (
              <Button
                type="submit"
                appearance="primary"
                className="cursor-pointer px-9 py-3"
                label={t('save') as string}
                name={'UPDATE'}
              />
            )}
          </div>
          <div className="flex gap-4">
            {unPublish && (
              <Button
                type="submit"
                appearance="secondary"
                className="cursor-pointer px-9 py-3"
                label={t('unpublish') as string}
                name={'SWITCH_TO_DRAFT'}
              />
            )}
            {remove && (
              <Button
                type="button"
                appearance="danger"
                className="cursor-pointer px-9 py-3"
                label={t('remove') as string}
                onClick={removeOpen}
              />
            )}

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
                  <a href="/place">
                    <Button
                      appearance="primary"
                      label={t('back') as string}
                      className="w-full cursor-pointer py-3"
                    />
                  </a>
                )}
                {!removed && (
                  <div className="space-y-3">
                    <div className="py-2 text-title-l">
                      {t('remove_prompt')}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        appearance="danger"
                        label={t('remove') as string}
                        className="w-full cursor-pointer"
                        icon="mdi:trash"
                        onClick={() => {
                          setRemoved(true)
                          placeId && removePlace(placeId)
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
          </div>
        </div>
      </form>
    </GroupWrapper>
  )
}
