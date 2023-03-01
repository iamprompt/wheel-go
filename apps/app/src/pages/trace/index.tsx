import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { TracingStatusLabel } from '@wheel-go/ui'
import { useTranslation } from 'react-i18next'
import { TraceMap } from '@/components/TraceMap'
import { HeaderLayout } from '@/layouts/Header'
import { BottomTracingActions } from '@/components/BottomTracingAction'
import { TRACE_STATUS, TRACE_STATUS_LABEL } from '@/const/TracingStatus'

export const TracePage: FC = () => {
  const { t } = useTranslation('trace')
  const [status, setStatus] = useState<TRACE_STATUS>(TRACE_STATUS.SAVED)

  const StatusLabel = useMemo(() => TRACE_STATUS_LABEL[status], [status])

  return (
    <HeaderLayout fullScreen>
      <TraceMap className="z-[1] h-screen w-screen" />
      <div className="safe-top safe-bottom absolute inset-0">
        <div className="relative h-full pt-14 pb-20">
          <div className="w-full z-20 relative py-6 px-4">
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
          <div className="right-0 absolute p-4 space-y-2 z-10">
            <div className="flex flex-col rounded-m overflow-hidden divide-y divide-soap-100 shadow-2">
              <button className="bg-white w-11 h-11 flex items-center justify-center">
                <Icon icon="ic:round-route" className="w-5 h-5" />
              </button>
              <button className="bg-white w-11 h-11 flex items-center justify-center">
                <Icon icon="ic:round-near-me" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomTracingActions status={status} />
    </HeaderLayout>
  )
}
