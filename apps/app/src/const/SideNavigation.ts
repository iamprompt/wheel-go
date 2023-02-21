import IconCampaign from '@iconify/icons-material-symbols/campaign-rounded'
import type { IconifyIcon } from '@iconify/react'

interface SideNavigationItem {
  to: string
  label: keyof typeof import('../locales/th.json')['navigation']
  icon?: IconifyIcon
  iconColor?: string
  iconPosition?: 'left' | 'right'
}

export const SideNavigationItems = [
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
] satisfies Array<SideNavigationItem>
