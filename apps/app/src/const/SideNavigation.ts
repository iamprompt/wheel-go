import IconCampaign from '@iconify/icons-material-symbols/campaign-rounded'
import type { IconifyIcon } from '@iconify/react'
import type { FC } from 'react'
import { HelpDialog } from '@/components/HelpDialog'

interface SideNavigationItem {
  to?: string
  label: keyof typeof import('../locales/th.json')['navigation']
  icon?: IconifyIcon
  iconColor?: string
  iconPosition?: 'left' | 'right'
  dialog?: FC<{ isOpen: boolean; onClose: () => void }>
}

export const SideNavigationItems: Array<SideNavigationItem> = [
  {
    to: '/announcements',
    label: 'announcement',
    icon: IconCampaign,
    iconColor: 'text-error-500',
    iconPosition: 'right',
  },
  {
    to: '/settings',
    label: 'settings',
  },
  {
    to: '/how-to-use',
    label: 'how_to_use',
  },
  {
    to: '/faq',
    label: 'faq',
  },
  {
    dialog: HelpDialog,
    label: 'help',
  },
]
