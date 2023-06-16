import { useRouter } from 'expo-router'
import type { ComponentProps } from 'react'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { getCurrentPosition } from '~/utils/location'
import COLORS from '~/styles/colors'
import { MapCameraConfig, MapStyle } from '~/const/map'
import { SURROUNDING_CONDITIONS } from '~/const/placeTypes'
import { usePreferences } from '~/context/usePreferences'
import {
  Facility_Types,
  Place_Types,
  useGetAnnouncementsQuery,
  useGetFacilitiesQuery,
  useGetPlacesLazyQuery,
  useGetPreDefinedRoutesQuery,
} from '~/generated-types'
import { MapPrefsModal } from './MapPrefsModal'
import { Modal } from './Modal'
import { WGMapControlButton } from './WGMapControlButton'
import { WGMapMarker } from './WGMapMarker'
import { WGPolyline } from './WGPolyline'

export const WGMapView = forwardRef<
  MapView,
  {
    selectedPlaceId?: string | null
    onSelectPlace?: (placeId: string) => void
    mapElements?: React.ReactNode
    showPreferences?: boolean
    showCurrentLocation?: boolean
    paddingControl?: number
    routes?: boolean
    children?: React.ReactNode
  } & ComponentProps<typeof MapView>
>(
  (
    {
      selectedPlaceId,
      onSelectPlace,
      children,
      mapElements,
      showPreferences,
      showCurrentLocation,
      paddingControl,
      routes = true,
      ...mapViewProps
    },
    ref,
  ) => {
    const router = useRouter()
    const mapRef = useRef<MapView>(null)
    const { mapViewPreferences } = usePreferences()
    const [isPrefsModalVisible, setPrefsModalVisible] = useState(false)

    const [getPlaces, { data: placesData }] = useGetPlacesLazyQuery()
    const { data: routesData } = useGetPreDefinedRoutesQuery()
    const { data: facilitiesData } = useGetFacilitiesQuery({
      variables: {
        options: {
          types: [Facility_Types.Ramp],
        },
      },
    })
    const { data: announcementsData } = useGetAnnouncementsQuery()

    useImperativeHandle(ref, () => mapRef.current!)

    const handleCurrentLocation = async () => {
      if (!mapRef.current) {
        return
      }

      try {
        const {
          coords: { latitude, longitude },
        } = await getCurrentPosition()

        mapRef.current.animateCamera({
          center: { latitude, longitude },
          zoom: 18,
        })
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getPlaces({
        variables: {
          type: [
            ...mapViewPreferences.places,
            ...(mapViewPreferences.conditions.includes(
              SURROUNDING_CONDITIONS.Curbcut,
            )
              ? [SURROUNDING_CONDITIONS.Curbcut]
              : []),
          ] as Place_Types[],
        },
      })
    }, [mapViewPreferences.places, mapViewPreferences.conditions])

    return (
      <View
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <MapView
          ref={mapRef}
          style={{
            flex: 1,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          customMapStyle={MapStyle}
          rotateEnabled={false}
          pitchEnabled={false}
          {...MapCameraConfig}
          {...mapViewProps}
        >
          {placesData?.getPlaces.map((place) => {
            if (!place || !place.location) {
              return null
            }

            const isPlaceSelected = selectedPlaceId === place.id

            return (
              <WGMapMarker
                key={place.id}
                coordinate={place.location}
                onPress={() => {
                  if (isPlaceSelected) {
                    return
                  }
                  onSelectPlace?.(place.id)
                }}
                type={place.type || Place_Types.Building}
                isSelected={isPlaceSelected}
              />
            )
          })}
          {mapViewPreferences.conditions.includes(
            SURROUNDING_CONDITIONS.Ramp,
          ) &&
            facilitiesData?.getFacilities.map((facility) => {
              if (!facility || !facility.location) {
                return null
              }

              return (
                <WGMapMarker
                  key={facility.id}
                  coordinate={facility.location}
                  type={
                    (facility.type as unknown as SURROUNDING_CONDITIONS) ||
                    SURROUNDING_CONDITIONS.Ramp
                  }
                />
              )
            })}
          {mapViewPreferences.conditions.includes(
            SURROUNDING_CONDITIONS.Incident,
          ) &&
            announcementsData?.getAnnouncements.map((announcement) => {
              if (!announcement || !announcement.location) {
                return null
              }

              return (
                <WGMapMarker
                  key={announcement.id}
                  coordinate={announcement.location}
                  type={SURROUNDING_CONDITIONS.Incident}
                  onPress={() => {
                    router.push(`/announcements/${announcement.id}`)
                  }}
                />
              )
            })}
          {routes &&
            mapViewPreferences.conditions.includes('ROUTE') &&
            routesData?.getRoutes.map((route) => {
              return (
                <WGPolyline
                  key={route.id}
                  color={route.type === 'PRE_DEFINED' ? 'info' : 'success'}
                  coordinates={
                    route.paths?.map(({ lat, lng }) => ({
                      latitude: lat,
                      longitude: lng,
                    })) || []
                  }
                />
              )
            })}
          {mapElements}
        </MapView>

        <View
          style={{
            position: 'absolute',
            right: 0,
            top: paddingControl || 0,
            gap: 8,
            marginHorizontal: 16,
            marginVertical: 16,
          }}
        >
          {showPreferences ? (
            <WGMapControlButton
              icon="tune"
              iconColor={COLORS.magenta[500]}
              onPress={() => setPrefsModalVisible(true)}
            />
          ) : null}
          {showCurrentLocation ? (
            <WGMapControlButton
              icon="near_me"
              iconColor={COLORS.info[400]}
              onPress={() => handleCurrentLocation()}
            />
          ) : null}
        </View>
        {children}
        <Modal
          isVisible={isPrefsModalVisible}
          modal={MapPrefsModal}
          onClose={() => {
            setPrefsModalVisible(false)
          }}
        />
      </View>
    )
  },
)
