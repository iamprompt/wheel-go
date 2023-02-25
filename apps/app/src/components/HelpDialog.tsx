import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Button } from '@wheel-go/ui'
import type { FC } from 'react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

interface HelpDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const HelpDialog: FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  const { t: tCommon } = useTranslation('common')
  const { t: tDialog } = useTranslation('dialog')

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[80]" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="relative flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex w-full max-w-md flex-col rounded-m bg-white px-4 py-6 text-left align-middle shadow-2 transition-all">
                <Dialog.Title className="mb-3 flex flex-row items-center justify-center gap-x-3 text-title-l">
                  <Icon
                    icon="ic:round-warning"
                    className="h-8 w-8 text-warning-400"
                  />
                  {tDialog('help.title')}
                </Dialog.Title>
                <p className="text-center text-subtext-l text-french-vanilla-500">
                  {tDialog('help.content')}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    label={tCommon('cancel')}
                    appearance="secondary"
                    onClick={() => onClose()}
                  />
                  <Button
                    label={tCommon('go')}
                    appearance="primary"
                    as="a"
                    href="https://www.facebook.com/DSS.Mahidol.Page"
                    target="_blank"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
