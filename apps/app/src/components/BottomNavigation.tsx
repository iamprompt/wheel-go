import type { ComponentProps, FC } from 'react'

// Icons
import IconFile from '@iconify/icons-ic/insert-drive-file'
import IconFileOutline from '@iconify/icons-ic/outline-insert-drive-file'
import IconExplore from '@iconify/icons-material-symbols/explore'
import IconExploreOutline from '@iconify/icons-material-symbols/explore-outline'
import IconPerson from '@iconify/icons-material-symbols/person'
import IconPersonOutline from '@iconify/icons-material-symbols/person-outline'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import type { IconifyIcon } from '@iconify/react'
import { Icon } from '@iconify/react'

interface NavigationItemProps {
  to: string
  icon: IconifyIcon
  selectedIcon: IconifyIcon
  label: string
}

export const NavigationItem: FC<NavigationItemProps> = ({
  to,
  icon,
  selectedIcon,
  label,
}) => {
  const { pathname } = useLocation()

  const isSelected = pathname === to

  return (
    <Link
      to={to}
      className={clsx(
        'flex flex-col items-center',
        !isSelected && 'text-french-vanilla-300'
      )}
    >
      <Icon icon={isSelected ? selectedIcon : icon} className="h-6 w-6" />
      <span className="mt-2 text-title-xs">{label}</span>
    </Link>
  )
}

interface BottomNavigationProps extends ComponentProps<'div'> {}

export const BottomNavigation: FC<BottomNavigationProps> = ({ ...props }) => {
  return (
    <div
      className="fixed bottom-0 left-0 z-50 w-full rounded-t-xl bg-white shadow-medium safe-left safe-right safe-bottom shadow-2"
      {...props}
    >
      <div className="grid grid-cols-3 pt-4">
        <NavigationItem
          to="/"
          icon={IconExploreOutline}
          selectedIcon={IconExplore}
          label="Explore"
        />
        <NavigationItem
          to="/records"
          icon={IconFileOutline}
          selectedIcon={IconFile}
          label="Records"
        />
        <NavigationItem
          to="/profile"
          icon={IconPersonOutline}
          selectedIcon={IconPerson}
          label="Profile"
        />
      </div>
    </div>
  )
}
