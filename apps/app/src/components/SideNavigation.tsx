import { Dialog, Transition } from '@headlessui/react'
import type { FC } from 'react'
import { Fragment } from 'react'

interface SideNavigationProps {
  isOpen: boolean
  onClose: () => void
}

export const SideNavigation: FC<SideNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose}></Dialog>
    </Transition>
  )
}
