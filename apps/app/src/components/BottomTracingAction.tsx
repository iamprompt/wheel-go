import { Button } from '@wheel-go/ui'
import type { ComponentProps, FC } from 'react'
import type { TRACE_STATUS } from '@/const/TracingStatus'

interface BottomTracingActionsProps extends ComponentProps<'div'> {
  status: TRACE_STATUS
  onStart: () => void
  onPause: () => void
  onContinue: () => void
  onStop: () => void
  onSave: () => void
}

export const BottomTracingActions: FC<BottomTracingActionsProps> = ({
  status,
  onStart,
  onPause,
  onContinue,
  onStop,
  onSave,
  ...props
}) => {
  return (
    <div
      className="shadow-medium fixed bottom-0 left-0 z-50 w-full rounded-t-xl bg-white shadow-2 safe-left safe-right safe-bottom"
      {...props}
    >
      <div className="flex flex-row items-center py-6 px-4 gap-5">
        {status === 'PREPARE' ? (
          <>
            <Button
              appearance="primary"
              label="Start Tracing"
              className="w-full"
              onClick={onStart}
            />
          </>
        ) : status === 'TRACING' ? (
          <>
            <Button
              appearance="secondary"
              label="Pause"
              icon="ic:pause"
              className="w-full"
              onClick={onPause}
            />
            <Button
              appearance="primary"
              label="Stop"
              icon="ic:stop"
              className="w-full"
              onClick={onStop}
            />
          </>
        ) : status === 'PAUSE' ? (
          <>
            <Button
              appearance="secondary"
              label="Continue"
              icon="ic:play-arrow"
              className="w-full"
              onClick={onContinue}
            />
            <Button
              appearance="primary"
              label="Stop"
              icon="ic:stop"
              className="w-full"
              onClick={onStop}
            />
          </>
        ) : status === 'SAVED' ? (
          <>
            <Button
              appearance="primary"
              label="Save"
              className="w-full"
              onClick={onSave}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}
