import { useState, type FC } from 'react'

import { GoogleMap, Polyline } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next'

import { StatisticsCard } from '~/components/StatisticsCard'
import { WGMapMarker } from '~/components/WGMapMarker'
import {
  Place_Types,
  useGetAllAnnouncementsQuery,
  useGetAllPlacesQuery,
  useGetAllReviewsQuery,
  useGetAllRoutesQuery,
  useGetAllUsersQuery,
  useGetPlacesQuery,
  useGetRoutePathsQuery,
  type Place,
} from '~/generated-types'

const Dashboard: FC = () => {
  const { data: routes } = useGetAllRoutesQuery()
  const { data: announcements } = useGetAllAnnouncementsQuery()
  const { data: places } = useGetAllPlacesQuery()
  const { data: reviews } = useGetAllReviewsQuery()
  const { data: users } = useGetAllUsersQuery()
  const { data: routesPaths } = useGetRoutePathsQuery()

  const { t, i18n } = useTranslation('dashboard')
  const isEN = i18n.language === 'en'

  const totalRoutes = {
    title: t('total_routes'),
    icon: 'ic:baseline-route',
    iconColor: 'text-success-400',
    current: routes?.getRoutes.length ?? '-',
  }
  const totalAnnouncements = {
    title: t('total_announcements'),
    icon: 'ic:round-warning',
    iconColor: 'text-warning-400',
    current: announcements?.getAnnouncements.length ?? '-',
  }
  const totalPlaces = {
    title: t('total_places'),
    icon: 'material-symbols:location-on',
    iconColor: 'text-info-400',
    current: places?.getPlaces.length ?? '-',
  }
  const totalReviews = {
    title: t('total_reviews'),
    icon: 'material-symbols:rate-review',
    iconColor: 'text-magenta-500',
    current: reviews?.getReviews.length ?? '-',
  }
  const totalUsers = {
    title: t('total_users'),
    icon: 'ic:round-people',
    iconColor: 'text-magenta-500',
    current: users?.getUsers.length ?? '-',
  }
  const getUsersByLevel = (level: string) => {
    return users?.getUsers.filter(
      (user) => user.metadata?.impairmentLevel === level,
    ).length
  }
  const impairmentLevel = [
    { key: t('impairment_level.level_0'), value: getUsersByLevel('0') ?? '-' },
    { key: t('impairment_level.level_1'), value: getUsersByLevel('1') ?? '-' },
    { key: t('impairment_level.level_2'), value: getUsersByLevel('2') ?? '-' },
    { key: t('impairment_level.level_3'), value: getUsersByLevel('3') ?? '-' },
    { key: t('impairment_level.level_4'), value: getUsersByLevel('4') ?? '-' },
  ]

  const center = {
    lat: 13.794673028027479,
    lng: 100.32292971800167,
  }

  const { error: _error, loading: _loading, data } = useGetPlacesQuery()
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  return (
    <div>
      <div className="mb-6 text-title-xl text-magenta-600">
        {t('dashboard')}
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatisticsCard {...totalRoutes} />
          <StatisticsCard {...totalAnnouncements} />
          <StatisticsCard {...totalPlaces} />
          <StatisticsCard {...totalReviews} />
        </div>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          <StatisticsCard {...totalUsers}>
            <div className="flex justify-between gap-x-6 text-magenta-600">
              <div className="text-title-m">{t('impairment_level.title')}</div>
              <div className="text-title-m">{t('impairment_amount')}</div>
            </div>
            {impairmentLevel.map(({ key, value }) => (
              <div
                key={key}
                className="flex justify-between gap-6 text-magenta-600"
              >
                <div className="text-body-m">{key}</div>
                <div className="text-body-m">{value}</div>
              </div>
            ))}
          </StatisticsCard>
          <div className="col-span-2 flex grow flex-col overflow-hidden rounded-3xl border border-solid border-french-vanilla-300">
            {/* <button onClick={() => console.log(selectedPlace)}>c</button> */}
            <div className="p-4 text-title-xl text-magenta-600">
              {t('accessible_areas')}
              {selectedPlace
                ? isEN
                  ? `: ${selectedPlace?.name?.en}`
                  : `: ${selectedPlace?.name?.th}`
                : null}
            </div>
            <GoogleMap
              center={center}
              zoom={16}
              mapContainerClassName="w-full h-full"
            >
              {routesPaths?.getRoutes && (
                <>
                  {routesPaths?.getRoutes.map((routePath) => {
                    return (
                      <Polyline
                        key={routePath.id}
                        /* @ts-expect-error @ts-ignore: path overload */
                        path={routePath.paths}
                        options={{
                          strokeColor: '#08CE57',
                          strokeOpacity: 0.4,
                          strokeWeight: 4,
                        }}
                      />
                    )
                  })}
                </>
              )}
              {data?.getPlaces && (
                <>
                  {data.getPlaces.map((place) => {
                    const isPlaceSelected = selectedPlace?.id === place.id
                    return (
                      <WGMapMarker
                        key={place.id}
                        coordinate={place.location ?? { lat: 0, lng: 0 }}
                        onPress={() => {
                          if (isPlaceSelected) {
                            setSelectedPlace(null)
                          } else {
                            setSelectedPlace(place)
                          }
                        }}
                        type={place.type || Place_Types.Building}
                        isSelected={isPlaceSelected}
                      />
                    )
                  })}
                </>
              )}
            </GoogleMap>
            {/* <div className="flex flex-row items-center justify-between gap-2 p-6">
              <div className="text-title-xl text-magenta-600">
                {t('accessible_areas')}
              </div>
              <Icon
                icon={'material-symbols:fullscreen-rounded'}
                className={'h-8 w-8 text-french-vanilla-500'}
              />
            </div>
            <div className="relative h-full w-full">
              <Image
                alt="map"
                src="/images/map.png"
                fill
                className="object-cover"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
