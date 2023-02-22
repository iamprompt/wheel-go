import type { IconifyIcon } from '@iconify/react'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'
import IconArrowForward from '@iconify/icons-material-symbols/arrow-forward-ios-rounded'

interface SettingListItemProps extends ComponentProps<'div'> {
  label: string
  value?: string
  icon?: IconifyIcon | false
}

export const SettingListItem: FC<SettingListItemProps> = ({
  icon,
  onClick,
  className,
  label,
  value,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'flex flex-row items-center justify-between px-4 py-3 text-sm font-bold w-full',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="text-magenta-600 text-title-xs">{label}</div>
      <div className="flex flex-1 flex-row items-center justify-end gap-3">
        <div className="text-right text-french-vanilla-500 text-title-xs">
          {value}
        </div>
        {icon !== false ? (
          <div className="flex h-6 w-6 items-center justify-center">
            <Icon
              icon={icon || IconArrowForward}
              className="text-french-vanilla-300"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
