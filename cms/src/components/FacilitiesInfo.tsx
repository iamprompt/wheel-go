import { useEffect, useState, type FC } from 'react'
import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'
import { Modal, NumberInput, Switch, Textarea, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next'

import { indentifySlopeType, isNumeric, timeout } from '~/utils/calculate'
import { Button } from '~/components/Button'
import { FacilitiesTable } from '~/components/FacilitiesTable'
import { GroupWrapper } from '~/components/GroupWrapper'
import { Tag } from '~/components/Tag'
import { WGMapMarker } from '~/components/WGMapMarker'
import type { Color } from '~/const/Color'
import { Concern } from '~/const/Concern'
import { Facilities } from '~/const/Facility'
import {
  Place_Types,
  Status,
  useCreateFacilityMutation,
  useDeleteFacilityMutation,
  useGetFacilitiesByPlaceIdQuery,
  useGetFacilityByIdQuery,
  useGetPlacesQuery,
  useUpdateFacilityMutation,
  type Concern_Types,
  type CreateFacilityInput,
  type Facility_Types,
  type LocationInput,
} from '~/generated-types'

interface FacilitiesInfoProps {
  placeId: string
}

export const FacilitiesInfo: FC<FacilitiesInfoProps> = ({ placeId }) => {
  const { t } = useTranslation('facility')
  const { t: tValidate } = useTranslation('validation')
  const { t: tTable } = useTranslation('table')

  const { data: placesData } = useGetPlacesQuery()
  const {
    error: _error,
    loading: _loading,
    refetch,
    data,
  } = useGetFacilitiesByPlaceIdQuery({
    variables: {
      placeId,
    },
  })

  const router = useRouter()
  const id = router.query.fid as string
  const { data: facilityData, refetch: refetchFacility } =
    useGetFacilityByIdQuery({ variables: { id } })

  const [type, setType] = useState<string>('')
  const [detailEN, setDetailEN] = useState<string>('')
  const [detailTH, setDetailTH] = useState<string>('')
  const [rise, setRise] = useState<number | null>(null)
  const [length, setLength] = useState<number | null>(null)
  const [lat, setLat] = useState<string | number | null>(null)
  const [lng, setLng] = useState<string | number | null>(null)
  const [isWarning, setIsWarning] = useState<boolean>(false)

  const [latError, setLatError] = useState<boolean>(false)
  const [lngError, setLngError] = useState<boolean>(false)

  useEffect(() => {
    if (
      lat === null ||
      (lat !== null && isNumeric(lat) && Math.abs(Number(lat)) <= 90)
    ) {
      setLatError(false)
    } else {
      setLatError(true)
    }
  }, [lat])

  useEffect(() => {
    if (
      lng === null ||
      (lng !== null && isNumeric(lng) && Math.abs(Number(lng)) <= 180)
    ) {
      setLngError(false)
    } else {
      setLngError(true)
    }
  }, [lng])

  useEffect(() => {
    if (id && facilityData?.getFacilityById) {
      const values = facilityData?.getFacilityById
      setType((values.type as any) ?? '')
      setDetailEN(values.detail!.en ?? '')
      setDetailTH(values.detail!.th ?? '')
      setRise(values.metadata!.rise ?? null)
      setLength(values.metadata!.length ?? null)
      setLat(values.location?.lat ?? null)
      setLng(values.location?.lng ?? null)
      setIsWarning(values.isWarning ?? false)
    } else {
      setType('')
      setDetailEN('')
      setDetailTH('')
      setRise(null)
      setLength(null)
      setLat(null)
      setLng(null)
      setIsWarning(false)
    }
  }, [id, facilityData])

  const [publishOpened, { open: publishOpen, close: publishClose }] =
    useDisclosure(false)

  const [removeOpened, { open: removeOpen, close: removeClose }] =
    useDisclosure(false)
  const [removed, setRemoved] = useState(false)

  const [updateOpened, { open: updateOpen, close: updateClose }] =
    useDisclosure(false)

  const [CreateFacility, { error: createError }] = useCreateFacilityMutation()
  const [UpdateFacility, { error: updateError }] = useUpdateFacilityMutation()
  const [DeleteFacility, { error: deleteError }] = useDeleteFacilityMutation()

  const addFacility = (data: CreateFacilityInput) => {
    CreateFacility({
      variables: {
        data,
      },
    })

    if (createError) {
      console.log(createError)
    }
  }

  const updateFacility = (id: string, data: CreateFacilityInput) => {
    UpdateFacility({
      variables: {
        id,
        data,
      },
    })

    if (updateError) {
      console.log(updateError)
    }
  }

  const removeFacility = (id: string) => {
    DeleteFacility({
      variables: {
        id,
      },
    })

    if (deleteError) {
      console.log(deleteError)
    }
  }

  const clearInput = () => {
    const { fid, ...routerQuery } = router.query
    if (fid) {
      router.replace(
        {
          query: { ...routerQuery },
        },
        undefined,
        { scroll: false },
      )
    }
    setType('')
    setDetailEN('')
    setDetailTH('')
    setRise(null)
    setLength(null)
    setLat(null)
    setLng(null)
    setIsWarning(false)
  }

  const handleRemoveFacility = (id: string) => {
    removeFacility(id as string)
    refetch()
    clearInput()
  }

  const handleAddFacility = () => {
    const data: CreateFacilityInput = {
      concern:
        rise && length
          ? (indentifySlopeType(rise, length) as Concern_Types)
          : undefined,
      detail: {
        en: detailEN,
        th: detailTH,
      },
      location:
        lat && lng
          ? ({ lat: lat.toString(), lng: lng.toString() } as LocationInput)
          : undefined,
      metadata: {
        length,
        rise,
      },
      parent: placeId,
      status: Status.Published,
      type: type as Facility_Types,
      isWarning,
    }
    addFacility(data)
    publishOpen()
    refetch()
    clearInput()
  }

  const handleClose = async () => {
    removeClose()
    refetch()
    await timeout(1000)
    setRemoved(false)
  }

  const handleUpdateFacility = async () => {
    const data: CreateFacilityInput = {
      concern:
        rise && length
          ? (indentifySlopeType(rise, length) as Concern_Types)
          : undefined,
      detail: {
        en: detailEN,
        th: detailTH,
      },
      location:
        lat && lng
          ? ({ lat: lat.toString(), lng: lng.toString() } as LocationInput)
          : undefined,
      metadata: {
        length,
        rise,
      },
      parent: placeId,
      type: type as Facility_Types,
      isWarning,
    }
    updateFacility(id as string, data)
    updateOpen()
    await timeout(1000)
    refetch()
    refetchFacility()
  }

  // Maps Handling
  const [showPin, setShowPin] = useState(true)

  const [selectedPosition, setSelectedPosition] = useState({
    // lat: lat ?? null,
    // lng: lng ?? null,
    lat,
    lng,
  })
  const [centerPosition, setCenterPosition] = useState({
    lat: lat ?? 13.794673028027479,
    lng: lng ?? 100.32292971800167,
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
    setLat(selectedPosition.lat)
    setLng(selectedPosition.lng)
  }, [selectedPosition])

  return (
    <>
      <Modal
        opened={publishOpened}
        onClose={publishClose}
        withCloseButton={false}
        centered
      >
        <div className="mb-4 mt-2 flex items-center justify-center gap-2 text-title-l text-success-400">
          <Icon icon="ep:success-filled" className="h-6 w-6 text-success-400" />
          {tTable('added')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            appearance="primary"
            label={tTable('close') as string}
            className="col-span-2 w-full cursor-pointer"
            onClick={() => {
              refetch()
              publishClose()
            }}
          />
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
          {tTable('save_success')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            appearance="primary"
            label={tTable('close') as string}
            className="col-span-2 w-full cursor-pointer"
            onClick={updateClose}
          />
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
              {tTable('remove_success')}
            </div>
          )}
          {removed && (
            <Button
              appearance="primary"
              label={tTable('close') as string}
              className="w-full cursor-pointer py-3"
              onClick={handleClose}
            />
          )}
          {!removed && (
            <div className="space-y-3">
              <div className="py-2 text-title-l">{tTable('remove_prompt')}</div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  appearance="danger"
                  label={tTable('remove') as string}
                  className="w-full cursor-pointer"
                  icon="mdi:trash"
                  onClick={() => {
                    setRemoved(true)
                    handleRemoveFacility(id as string)
                  }}
                />
                <Button
                  appearance="primary"
                  label={tTable('discard') as string}
                  className="w-full cursor-pointer"
                  onClick={removeClose}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
      {data && (
        <GroupWrapper
          title={t('info')}
          description={t('details') as string}
          className="rounded-3xl bg-soap-100 p-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <FacilitiesTable data={data.getFacilitiesByPlaceId} />
            <GroupWrapper
              title="Facility"
              className="h-fit gap-6 rounded-3xl bg-french-vanilla-100 p-6"
            >
              <div className="mt-2 flex flex-wrap gap-4">
                {Object.keys(Facilities).map((element) => {
                  const item = element as Facility_Types
                  return (
                    <Tag
                      type="button"
                      key={item}
                      label={t(item)}
                      icon={Facilities[item].icon}
                      state={
                        type === ''
                          ? 'available'
                          : type === item
                          ? 'available'
                          : 'disabled'
                      }
                      disabled={id !== undefined}
                      className="cursor-pointer border-solid hover:border hover:border-magenta-500"
                      onClick={() => {
                        setType(item)
                        setDetailEN('')
                        setDetailTH('')
                        setRise(null)
                        setLength(null)
                        setLat(null)
                        setLng(null)
                        setIsWarning(false)
                      }}
                    />
                  )
                })}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Textarea
                  label={t('details_en')}
                  placeholder={t('details_en_placeholder') as string}
                  autosize
                  minRows={2}
                  value={detailEN}
                  onChange={(event) => setDetailEN(event.currentTarget.value)}
                  disabled={type === ''}
                />
                <Textarea
                  label={t('details_th')}
                  placeholder={t('details_th_placeholder') as string}
                  autosize
                  minRows={2}
                  value={detailTH}
                  onChange={(event) => setDetailTH(event.currentTarget.value)}
                  disabled={type === ''}
                />
                {type === 'RAMP' && (
                  <div className="col-span-2 grid grid-cols-2 gap-6">
                    <NumberInput
                      label={t('rise')}
                      placeholder={t('rise_placeholder') as string}
                      value={rise ?? ''}
                      onChange={(event) => setRise(Number(event))}
                      hideControls
                      min={0}
                    />
                    <NumberInput
                      label={t('length')}
                      placeholder={t('length_placeholder') as string}
                      value={length ?? ''}
                      onChange={(event) => setLength(Number(event))}
                      hideControls
                      min={0}
                    />
                    {length !== null && rise !== null && (
                      <Tag
                        label={t(indentifySlopeType(rise, length))}
                        color={
                          Concern[indentifySlopeType(rise, length)]
                            .color as Color
                        }
                        className="col-span-2 border-solid"
                      />
                    )}
                  </div>
                )}
              </div>
              {type === 'RAMP' && (
                <>
                  <GroupWrapper title={t('geolocation')} small>
                    <div className="grid grid-cols-2 gap-6">
                      <TextInput
                        label={t('latitude')}
                        placeholder={t('latitude_placeholder') as string}
                        value={lat ?? ''}
                        onChange={(event) =>
                          event.currentTarget.value === ''
                            ? setLat(null)
                            : setLat(event.currentTarget.value)
                        }
                        error={latError ? tValidate('latitude') : false}
                      />
                      <TextInput
                        label={t('longitude')}
                        placeholder={t('longitude_placeholder') as string}
                        value={lng ?? ''}
                        onChange={(event) =>
                          event.currentTarget.value === ''
                            ? setLng(null)
                            : setLng(event.currentTarget.value)
                        }
                        error={lngError ? tValidate('longitude') : false}
                      />
                    </div>
                  </GroupWrapper>
                  <Switch
                    label={tTable('togglePin')}
                    checked={showPin}
                    color="violet"
                    onChange={() => setShowPin(!showPin)}
                    className="mb-4"
                  />
                  <div className="h-[350px] bg-[#f1f3f5]">
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
                                coordinate={
                                  place.location ?? { lat: 0, lng: 0 }
                                }
                                onPress={() => {
                                  console.log('pressed')
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
                  </div>
                </>
              )}
              <Switch
                label={t('warn')}
                checked={isWarning}
                onChange={(event) => setIsWarning(event.currentTarget.checked)}
                color="violet"
                disabled={type === ''}
              />
              {data?.getFacilitiesByPlaceId.length !== 0 && (
                <div className="grid grid-cols-2 gap-6">
                  <Button
                    appearance="danger"
                    label={t('remove') as string}
                    className="w-full cursor-pointer"
                    icon="mdi:trash"
                    onClick={removeOpen}
                    type="button"
                    disabled={type === '' || id === undefined}
                  />
                  <Button
                    appearance="primary"
                    label={t('save') as string}
                    className="cursor-pointer px-4"
                    onClick={handleUpdateFacility}
                    type="button"
                    disabled={type === '' || id === undefined}
                  />
                </div>
              )}
              <Button
                appearance="primary"
                label={t('add') as string}
                className="cursor-pointer px-4"
                icon="ic:round-add"
                disabled={type === '' || id !== undefined}
                type="button"
                onClick={handleAddFacility}
              />
            </GroupWrapper>
          </div>
        </GroupWrapper>
      )}
    </>
  )
}
