import { Button } from '@wheel-go/ui'
import type { ComponentProps, FC } from 'react'
import { Fragment } from 'react'
import { Icon } from '@iconify/react'
import { Dialog, Transition } from '@headlessui/react'
import type { TRACE_STATUS } from '@/const/TracingStatus'

const PausePopup: FC<{ status: boolean }> = ({ status }) => {
  return (
    <Transition appear show={status}>
      <Dialog
        as="div"
        onClose={() => {}}
        className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-4"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-magenta-600/60" />
        </Transition.Child>
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
          as={Fragment}
        >
          <Dialog.Panel className="bottom-0 z-40 mx-auto w-full max-w-screen-md rounded-t-xl bg-white shadow-2 safe-bottom">
            <div className="pb-24">
              <div className="flex flex-col items-center space-y-3 p-4">
                <Icon icon="ic:round-accessible" className="h-20 w-20" />
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
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

const DonePopup: FC<{ status: boolean }> = ({ status }) => {
  return (
    <Transition appear show={status}>
      <Dialog
        as="div"
        onClose={() => {}}
        className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-4"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-magenta-600/60" />
        </Transition.Child>
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
          as={Fragment}
        >
          <div className="bottom-0 z-40 mx-auto w-full max-w-screen-md rounded-t-xl bg-white shadow-2 safe-bottom">
            <div className="pb-24">
              <div className="divide-y divide-french-vanilla-300 p-4">
                <div className="flex flex-col items-center space-y-3 pb-6">
                  <Icon icon="ic:round-celebration" className="h-20 w-20" />
                  <div className="space-y-3 text-center">
                    <div className="text-title-xxl text-magenta-500">Done!</div>
                    <div className="text-body-l text-french-vanilla-500">
                      Thank you for your contribution
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between pt-6">
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
      </Dialog>
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
        className="fixed bottom-0 left-0 z-50 w-full rounded-t-xl bg-white shadow-2 safe-left safe-right safe-bottom"
        {...props}
      >
        <div className="flex flex-row items-center gap-5 py-6 px-4">
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
