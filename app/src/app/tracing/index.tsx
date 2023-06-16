import {
  requestBackgroundPermissionsAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { isTaskRegisteredAsync } from 'expo-task-manager'
import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import type { UserLocationChangeEvent } from 'react-native-maps'
import type MapView from 'react-native-maps'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import dayjs from 'dayjs'
import { getPathLength } from 'geolib'

import { MaterialIcons } from '~/utils/icons/MaterialIcons'
import Button, { ButtonVariant } from '~/components/Button'
import { HeaderBackButton } from '~/components/HeaderBackButton'
import { HeaderLogo } from '~/components/HeaderLogo'
import { HorizontalDivider } from '~/components/HorizontalDivider'
import { Modal } from '~/components/Modal'
import { TracingSaveModal } from '~/components/TracingSaveModal'
import { TracingStatusIndicator } from '~/components/TracingStatusIndicator'
import { TracingStopModal } from '~/components/TracingStopModal'
import { WGMapView } from '~/components/WGMapView'
import { WGPolyline } from '~/components/WGPolyline'
import COLORS from '~/styles/colors'
import FONTS from '~/styles/fonts'
import { TRACING_STATES } from '~/const/trace'
import { useStoreon } from '~/context/useStoreon'
import { Route_Types, useCreateRoutesMutation } from '~/generated-types'
import { LOCATION_TRACE_CONFIG, LOCATION_TRACE_TASK_NAME } from '~/tasks/trace'

function Page() {
  const { trace, dispatch } = useStoreon('trace')
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const coordinates = useMemo(
    () =>
      trace.paths.map((rec) => ({
        latitude: rec.lat,
        longitude: rec.lng,
      })),
    [trace.paths],
  )
  const duration = useMemo(() => {
    if (trace.paths.length < 2) {
      return 0
    }
    return (
      trace.paths[trace.paths.length - 1].timestamp - trace.paths[0].timestamp
    )
  }, [trace.paths])

  const distance = useMemo(() => {
    if (coordinates.length < 2) {
      return 0
    }

    const length = getPathLength(coordinates)
    return length
  }, [coordinates])

  const mapRef = useRef<MapView>(null)
  const [state, setState] = useState<TRACING_STATES>(TRACING_STATES.READY)
  const [isStopModalVisible, setIsStopModalVisible] = useState(false)
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false)

  const [createRoute] = useCreateRoutesMutation({
    refetchQueries: ['GetMyTracedRoutes'],
  })

  const handleLocationChange = (e: UserLocationChangeEvent) => {
    const { coordinate } = e.nativeEvent

    if (!coordinate) {
      return
    }

    const { latitude, longitude } = coordinate

    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude,
          longitude,
        },
      })
    }
  }

  const startTask = async () => {
    await startLocationUpdatesAsync(
      LOCATION_TRACE_TASK_NAME,
      LOCATION_TRACE_CONFIG,
    )
  }

  const stopTask = async () => {
    const isRegistered = await isTaskRegisteredAsync(LOCATION_TRACE_TASK_NAME)

    if (isRegistered) {
      await stopLocationUpdatesAsync(LOCATION_TRACE_TASK_NAME)
    }
  }

  const handleStart = async () => {
    const { status } = await requestBackgroundPermissionsAsync()

    if (status !== 'granted') {
      console.log('Permission to access location was denied')
      return
    }

    console.log('Start Recording')

    setState(TRACING_STATES.RECORDING)

    await startTask()
  }

  const handlePause = async () => {
    setState(TRACING_STATES.PAUSED)

    await stopTask()
  }

  const handleResume = async () => {
    setState(TRACING_STATES.RECORDING)

    await startTask()
  }

  const handleStop = () => {
    setIsStopModalVisible(true)
  }

  const handleStopAction = async () => {
    setState(TRACING_STATES.FINISHED)

    await stopTask()
  }

  const handleSave = () => {
    setIsSaveModalVisible(true)
  }

  const handleSaveAction = async () => {
    const result = await createRoute({
      variables: {
        input: {
          paths: trace.paths.map((rec) => ({
            lat: rec.lat.toString(),
            lng: rec.lng.toString(),
          })),
          duration,
          distance,
          type: Route_Types.Traced,
        },
      },
    })

    console.log(JSON.stringify(result, null, 2))

    dispatch('trace/clear')

    setState(TRACING_STATES.SAVED)
  }

  const handleDone = () => {
    router.replace('/')
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Tracing',
          headerShown: true,
          headerBackVisible: false,
          headerTitle: HeaderLogo,
          headerLeft:
            state === TRACING_STATES.READY ? HeaderBackButton() : () => null,
        }}
      />

      <StatusBar style="auto" />

      <WGMapView
        ref={mapRef}
        onUserLocationChange={handleLocationChange}
        mapElements={<WGPolyline coordinates={coordinates} />}
        showCurrentLocation
        showPreferences
        paddingControl={72}
        routes={false}
      >
        {/* Status Indicator */}
        <TracingStatusIndicator
          status={state}
          style={{
            margin: 16,
            marginBottom: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        />

        {/* Background Overlay */}
        {[
          TRACING_STATES.PAUSED,
          TRACING_STATES.FINISHED,
          TRACING_STATES.SAVED,
        ].includes(state) ? (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.magenta[600],
                opacity: 0.6,
              }}
            />
          </Animated.View>
        ) : null}

        <Modal
          isVisible={isStopModalVisible}
          onClose={() => setIsStopModalVisible(false)}
          onAction={handleStopAction}
          modal={TracingStopModal}
        />

        <Modal
          isVisible={isSaveModalVisible}
          onClose={() => setIsSaveModalVisible(false)}
          onAction={handleSaveAction}
          modal={TracingSaveModal}
        />

        {state === TRACING_STATES.PAUSED ? (
          <Animated.View
            entering={SlideInDown.duration(500)}
            exiting={SlideOutDown.duration(500)}
          >
            <View
              style={{
                zIndex: 1,
                position: 'absolute',
                bottom: insets.bottom + 97,
                left: 0,
                right: 0,
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.white,
                  padding: 16,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  alignItems: 'center',
                }}
              >
                <MaterialIcons
                  name="accessible"
                  size={80}
                  color={COLORS.magenta[500]}
                  style={{
                    marginBottom: 12,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_BOLD,
                      fontSize: 32,
                      textAlign: 'center',
                      color: COLORS.magenta[500],
                      marginBottom: 8,
                    }}
                  >
                    {t('trace.pause_popup.title')}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_REGULAR,
                      fontSize: 16,
                      textAlign: 'center',
                      color: COLORS['french-vanilla'][500],
                    }}
                  >
                    {t('trace.pause_popup.description')}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        ) : null}

        {state === TRACING_STATES.FINISHED ? (
          <Animated.View
            entering={SlideInDown.duration(500)}
            exiting={SlideOutDown.duration(500)}
          >
            <View
              style={{
                zIndex: 1,
                position: 'absolute',
                bottom: insets.bottom + 97,
                left: 0,
                right: 0,
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.white,
                  padding: 16,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  alignItems: 'center',
                }}
              >
                <MaterialIcons
                  name="celebration"
                  size={80}
                  color={COLORS.magenta[500]}
                  style={{
                    marginBottom: 12,
                  }}
                />
                <View
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_BOLD,
                      fontSize: 32,
                      textAlign: 'center',
                      color: COLORS.magenta[500],
                      marginBottom: 8,
                    }}
                  >
                    {t('trace.finish_popup.title')}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.LSTH_REGULAR,
                      fontSize: 16,
                      textAlign: 'center',
                      color: COLORS['french-vanilla'][500],
                    }}
                  >
                    {t('trace.finish_popup.description')}
                  </Text>
                </View>
                <HorizontalDivider />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 16,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.LSTH_BOLD,
                        fontSize: 14,
                        color: COLORS['french-vanilla'][500],
                      }}
                    >
                      {t('trace.finish_popup.overall_time')}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.LSTH_BOLD,
                        fontSize: 20,
                      }}
                    >
                      {dayjs.duration(duration, 'millisecond').format('mm:ss')}{' '}
                      {t('units.minutes')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.LSTH_BOLD,
                        fontSize: 14,
                        color: COLORS['french-vanilla'][500],
                      }}
                    >
                      {t('trace.finish_popup.overall_distance')}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.LSTH_BOLD,
                        fontSize: 20,
                      }}
                    >
                      {distance} {t('units.meters')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        ) : null}

        {/* Action Button Group */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: insets.bottom,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              borderTopColor: COLORS['french-vanilla'][300],
              borderTopWidth: 1,
              paddingHorizontal: 16,
              paddingVertical: 24,
              flexDirection: 'row',
              gap: 16,
            }}
          >
            {state === TRACING_STATES.READY ? (
              <Button onPress={handleStart} label="trace.start" fullWidth />
            ) : null}
            {state === TRACING_STATES.RECORDING ? (
              <>
                <Button onPress={handlePause} label="trace.pause" fullWidth />
                <Button
                  onPress={handleStop}
                  label="trace.stop"
                  variant={ButtonVariant.Secondary}
                  fullWidth
                />
              </>
            ) : null}
            {state === TRACING_STATES.PAUSED ? (
              <>
                <Button onPress={handleResume} label="trace.resume" fullWidth />
                <Button
                  onPress={handleStop}
                  label="trace.stop"
                  variant={ButtonVariant.Secondary}
                  fullWidth
                />
              </>
            ) : null}
            {state === TRACING_STATES.FINISHED ? (
              <Button onPress={handleSave} label="trace.save" fullWidth />
            ) : null}
            {state === TRACING_STATES.SAVED ? (
              <Button onPress={handleDone} label="button.done" fullWidth />
            ) : null}
          </View>
        </View>
      </WGMapView>
    </View>
  )
}

export default Page
