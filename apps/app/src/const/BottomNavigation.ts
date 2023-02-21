import type { IconifyIcon } from '@iconify/react'
// Icons
import IconFile from '@iconify/icons-ic/insert-drive-file'
import IconFileOutline from '@iconify/icons-ic/outline-insert-drive-file'
import IconExplore from '@iconify/icons-material-symbols/explore'
import IconExploreOutline from '@iconify/icons-material-symbols/explore-outline'
import IconPerson from '@iconify/icons-material-symbols/person'
import IconPersonOutline from '@iconify/icons-material-symbols/person-outline'

interface BottomNavigationItem {
  to: string
  label: keyof typeof import('../locales/th.json')['navigation']
  icon: IconifyIcon
  selectedIcon: IconifyIcon
}

export const BottomNavigationItems = [
  {
    to: '/',
    label: 'explore',
    icon: IconExploreOutline,
    selectedIcon: IconExplore,
  },
  {
    to: '/records',
    label: 'records',
    icon: IconFileOutline,
    selectedIcon: IconFile,
  },
  {
    to: '/profile',
    label: 'profile',
    icon: IconPersonOutline,
    selectedIcon: IconPerson,
  },
] satisfies Array<BottomNavigationItem>
