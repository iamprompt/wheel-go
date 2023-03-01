import { Button } from '@wheel-go/ui'
import type { ComponentProps, FC } from 'react'

interface BottomTracingActionsProps extends ComponentProps<'div'> {}

export const BottomTracingActions: FC<BottomTracingActionsProps> = ({
  ...props
}) => {
  return (
    <div
      className="shadow-medium fixed bottom-0 left-0 z-50 w-full rounded-t-xl bg-white shadow-2 safe-left safe-right safe-bottom"
      {...props}
    >
      <div className="flex flex-row items-center py-6 px-4 gap-5">
        <Button
          appearance="secondary"
          label="Pause"
          icon="ic:pause"
          className="w-full"
        />
        <Button
          appearance="primary"
          label="Stop"
          icon="ic:stop"
          className="w-full"
        />
      </div>
    </div>
  )
}
