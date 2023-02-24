import { Dialog, Transition } from '@headlessui/react'
import type { FC } from 'react'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import type { IconifyIcon } from '@iconify/react'
import { Icon } from '@iconify/react'
import IconArrowBack from '@iconify/icons-material-symbols/arrow-back-ios-new-rounded'
import { useTranslation } from 'react-i18next'
import { Button } from '@wheel-go/ui'
import { WheelGoWordMark } from './WheelGoWordMark'
import { SideNavigationItems } from '@/const/SideNavigation'

interface DialogMenuItemProps {
  to?: string
  label: keyof typeof import('../locales/th.json')['navigation']
  icon?: IconifyIcon
  iconColor?: string
  iconPosition?: 'left' | 'right'
  dialog?: FC<{ isOpen: boolean; onClose: () => void }>
}

const DialogMenuItem: FC<DialogMenuItemProps> = ({
  to,
  label,
  dialog: DialogComponent,
  icon,
  iconColor,
  iconPosition = 'right',
}) => {
  const { t } = useTranslation('navigation')
  const [isOpen, setIsOpen] = useState(false)

  const IconElement = icon ? (
    <Icon icon={icon} className={clsx('inline-block w-6 h-6', iconColor)} />
  ) : null

  return (
    <>
      <div className="flex gap-3 items-center py-3 px-6">
        {iconPosition === 'left' ? IconElement : null}
        {to ? (
          <Link to={to} className="font-bold text-gray-900">
            {t(label)}
          </Link>
        ) : (
          <div
            className="font-bold text-gray-900 cursor-pointer"
            {...{
              ...(DialogComponent
                ? {
                    onClick: () => setIsOpen(true),
                  }
                : {}),
            }}
          >
            {t(label)}
          </div>
        )}
        {iconPosition === 'right' ? IconElement : null}
      </div>
      {DialogComponent ? (
        <DialogComponent
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false)
          }}
        />
      ) : null}
    </>
  )
}

interface SideNavigationProps {
  isOpen: boolean
  onClose: () => void
}

export const SideNavigation: FC<SideNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('navigation')

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
          <div className="relative flex min-h-full items-start justify-start">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="-translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="-translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="flex min-h-screen w-full max-w-[300px] flex-col bg-white p-6 text-left align-middle shadow-xl transition-all safe-top safe-bottom">
                <div className="grow">
                  <div>
                    {/* Header */}
                    <div className="mb-8 flex flex-row items-end justify-between py-4">
                      <button type="button" onClick={onClose}>
                        <Icon icon={IconArrowBack} className="h-6 w-6" />
                      </button>
                      <WheelGoWordMark className="h-6" />
                    </div>
                  </div>

                  <div className="mb-8 flex items-center gap-4 border-y p-4">
                    <div>
                      <img
                        src="https://gravatar.com/avatar/1b052f?d=mp"
                        alt="Profile"
                        className="h-16 w-16 rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-sm">Hi 👋,</div>
                      <div className="text-xl font-bold">John Doe</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {SideNavigationItems.map((item) => (
                      <DialogMenuItem
                        key={`side_${item.label}`}
                        to={item.to}
                        label={item.label}
                        icon={item.icon}
                        iconColor={item.iconColor}
                        iconPosition={item.iconPosition}
                        dialog={item.dialog}
                      />
                    ))}
                  </div>
                </div>
                <div className="py-4">
                  <Button
                    appearance="secondary"
                    className="w-full"
                    onClick={() => {}}
                    label={t('logout')}
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
