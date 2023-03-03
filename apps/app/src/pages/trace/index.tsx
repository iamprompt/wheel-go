import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { TracingStatusLabel } from '@wheel-go/ui'
import { useTranslation } from 'react-i18next'
import { Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useNavigate } from 'react-router-dom'
import { TraceMap } from '@/components/TraceMap'
import { HeaderLayout } from '@/layouts/Header'
import { BottomTracingActions } from '@/components/BottomTracingAction'
import { TRACE_STATUS, TRACE_STATUS_LABEL } from '@/const/TracingStatus'
import { useGeolocation } from '@/contexts/useGeolocation'

const GoToCurrentLocationButton = () => {
  const map = useMap()
  const { latitude, longitude } = useGeolocation()

  const goToCurrentLocation = () => {
    if (latitude === null || longitude === null) {
      return
    }

    const latlng = new L.LatLng(latitude, longitude)
    map.flyTo(latlng, 18)
  }

  return (
    <button
      className="bg-white w-11 h-11 flex items-center justify-center"
      onClick={goToCurrentLocation}
    >
      <Icon icon="ic:round-near-me" className="w-5 h-5" />
    </button>
  )
}

interface TraceData {
  latitude: number
  longitude: number
  timestamp: number
}

export const TracePage: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('trace')
  const [status, setStatus] = useState<TRACE_STATUS>(TRACE_STATUS.PREPARE)

  const StatusLabel = useMemo(() => TRACE_STATUS_LABEL[status], [status])

  const { latitude, longitude } = useGeolocation()
  const [traceData, setTraceData] = useState<TraceData[]>([])

  const onTraceStart = async () => {
    if (latitude === null || longitude === null) {
      return
    }
    setStatus(TRACE_STATUS.TRACING)
    setTraceData([
      {
        latitude,
        longitude,
        timestamp: Date.now(),
      },
    ])
  }

  const onTracePause = async () => {
    setStatus(TRACE_STATUS.PAUSE)
  }

  const onTraceStop = async () => {
    setStatus(TRACE_STATUS.SAVED)
  }

  const onTraceSave = () => {
    setTraceData([])
    setStatus(TRACE_STATUS.PREPARE)
    navigate('/')
  }

  useEffect(() => {
    console.log('update', latitude, longitude)
    if (latitude === null || longitude === null) {
      return
    }

    if (status === TRACE_STATUS.TRACING) {
      setTraceData((prev) => [
        ...prev,
        {
          latitude,
          longitude,
          timestamp: Date.now(),
        },
      ])
    }
  }, [latitude, longitude])

  return (
    <HeaderLayout fullScreen>
      <TraceMap className="z-[1] h-screen w-screen">
        <Polyline
          positions={traceData.map((data) => [data.latitude, data.longitude])}
          pathOptions={{ color: 'black', opacity: 1 }}
        />
        <div className="safe-top safe-bottom absolute inset-0">
          <div className="relative h-full pt-14 pb-20">
            <div className="w-full relative py-6 px-4 z-[450]">
              <TracingStatusLabel
                label={t(`status.${StatusLabel.label}`)}
                color={
                  StatusLabel.color as Parameters<
                    typeof TracingStatusLabel
                  >[0]['color']
                }
                icon={StatusLabel.icon}
              />
            </div>
            <div className="right-0 absolute p-4 space-y-2 z-[450]">
              <div className="flex flex-col rounded-m overflow-hidden divide-y divide-soap-100 shadow-2">
                <button className="bg-white w-11 h-11 flex items-center justify-center">
                  <Icon icon="ic:round-route" className="w-5 h-5" />
                </button>
                <GoToCurrentLocationButton />
              </div>
            </div>
          </div>
        </div>
      </TraceMap>
      <BottomTracingActions
        status={status}
        onStart={onTraceStart}
        onPause={onTracePause}
        onContinue={onTraceStart}
        onStop={onTraceStop}
        onSave={onTraceSave}
      />
    </HeaderLayout>
  )
}
