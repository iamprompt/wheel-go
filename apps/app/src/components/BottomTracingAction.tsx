import { Button } from '@wheel-go/ui'
import type { ComponentProps, FC } from 'react'
import { Fragment } from 'react'
import { Icon } from '@iconify/react'
import { Transition } from '@headlessui/react'
import type { TRACE_STATUS } from '@/const/TracingStatus'

const PausePopup: FC<{ status: boolean }> = ({ status }) => {
  return (
    <Transition show={status}>
      <div className="absolute bottom-0 inset-x-0 flex justify-center px-4 z-10">
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
          as={Fragment}
        >
          <div className="z-40 shadow-medium bottom-0 max-w-screen-md mx-auto w-full rounded-t-xl bg-white shadow-2 safe-bottom">
            <div className="pb-24">
              <div className="p-4 flex items-center flex-col space-y-3">
                <Icon icon="ic:round-accessible" className="w-20 h-20" />
                <div className="space-y-3">
                  <div className="text-title-xxl text-magenta-500">
                    Take a break
                  </div>
                  <div className="text-body-l text-french-vanilla-500">
                    continue when you&apos;re ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}

const DonePopup: FC<{ status: boolean }> = ({ status }) => {
  return (
    <Transition show={status}>
      <div className="absolute bottom-0 inset-x-0 flex justify-center px-4 z-10">
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
          as={Fragment}
        >
          <div className="z-40 shadow-medium bottom-0 max-w-screen-md mx-auto w-full rounded-t-xl bg-white shadow-2 safe-bottom">
            <div className="pb-24">
              <div className="p-4 divide-y divide-french-vanilla-300">
                <div className="flex items-center flex-col space-y-3 pb-6">
                  <Icon icon="ic:round-celebration" className="w-20 h-20" />
                  <div className="space-y-3 text-center">
                    <div className="text-title-xxl text-magenta-500">Done!</div>
                    <div className="text-body-l text-french-vanilla-500">
                      Thank you for your contribution
                    </div>
                  </div>
                </div>
                <div className="pt-6 flex flex-row justify-between">
                  <div>
                    <div className="text-title-xs text-french-vanilla-500">
                      Total Time
                    </div>
                    <div className="text-title-l">5:00 mins</div>
                  </div>
                  <div>
                    <div className="text-title-xs text-french-vanilla-500">
                      Total Distance
                    </div>
                    <div className="text-title-l">20 metres</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}

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
    <>
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
                icon="ic:round-pause"
                className="w-full"
                onClick={onPause}
              />
              <Button
                appearance="primary"
                label="Stop"
                icon="ic:round-stop"
                className="w-full"
                onClick={onStop}
              />
            </>
          ) : status === 'PAUSE' ? (
            <>
              <Button
                appearance="secondary"
                label="Continue"
                icon="ic:round-play-arrow"
                className="w-full"
                onClick={onContinue}
              />
              <Button
                appearance="primary"
                label="Stop"
                icon="ic:round-stop"
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
      <PausePopup status={status === 'PAUSE'} />
      <DonePopup status={status === 'SAVED'} />
    </>
  )
}
