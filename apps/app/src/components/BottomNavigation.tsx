import type { ComponentProps, FC } from 'react'

import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import type { IconifyIcon } from '@iconify/react'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { BottomNavigationItems } from '@/const/BottomNavigation'

interface NavigationItemProps {
  to: string
  icon: IconifyIcon
  selectedIcon: IconifyIcon
  label: keyof typeof import('../locales/th.json')['navigation']
}

export const NavigationItem: FC<NavigationItemProps> = ({
  to,
  icon,
  selectedIcon,
  label,
}) => {
  const { t } = useTranslation('navigation')
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
      <span className="mt-2 text-title-xs">{t(label)}</span>
    </Link>
  )
}

interface BottomNavigationProps extends ComponentProps<'div'> {}

export const BottomNavigation: FC<BottomNavigationProps> = ({ ...props }) => {
  return (
    <div
      className="fixed bottom-0 left-0 z-50 w-full rounded-t-xl bg-white shadow-2 safe-left safe-right safe-bottom"
      {...props}
    >
      <div className="grid h-20 grid-cols-3 items-center py-2">
        {BottomNavigationItems.map((item) => (
          <NavigationItem
            key={`bottom_${item.label}`}
            to={item.to}
            icon={item.icon}
            selectedIcon={item.selectedIcon}
            label={item.label}
          />
        ))}
      </div>
    </div>
  )
}
