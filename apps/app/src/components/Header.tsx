import { Icon } from '@iconify/react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import IconArrowBack from '@iconify/icons-material-symbols/arrow-back-ios-new-rounded'
import clsx from 'clsx'

interface HeaderProps {
  left?: JSX.Element | false
  right?: JSX.Element | false
  title?: JSX.Element | string | null
  transparent?: boolean
}

export const Header: FC<HeaderProps> = ({
  left: LeftAction,
  right: RightAction,
  title,
  transparent = false,
}) => {
  const navigate = useNavigate()

  const shouldShowDefaultLeftAction = LeftAction !== false
  const DefaultLeftAction = (
    <button onClick={() => navigate(-1)}>
      <Icon icon={IconArrowBack} className="h-6 w-6" />
    </button>
  )

  const shouldShowDefaultRightAction = RightAction !== false
  const DefaultRightAction = <></>

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 z-50 w-full safe-top',
        transparent ? 'bg-transparent' : 'border-b border-soap-100 bg-white'
      )}
    >
      <header className="flex w-full flex-row items-center justify-between px-5 py-4">
        {/* Left Side Hamburger Menu */}
        <div className="h-6">
          {shouldShowDefaultLeftAction ? LeftAction || DefaultLeftAction : null}
        </div>
        {/* Center Logo */}
        <div className="shrink-0">
          {typeof title === 'string' ? (
            <div className="text-title-s leading-4">{title}</div>
          ) : (
            title
          )}
        </div>
        {/* Right Side Action Button */}
        <div className="h-6">
          {shouldShowDefaultRightAction
            ? RightAction || DefaultRightAction
            : null}
        </div>
      </header>
    </div>
  )
}
