import { Icon } from '@iconify/react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import IconArrowBack from '@iconify/icons-material-symbols/arrow-back-ios-new-rounded'

interface HeaderProps {
  left?: JSX.Element | false
  right?: JSX.Element | false
  title: JSX.Element | string
}

export const Header: FC<HeaderProps> = ({
  left: LeftAction,
  right: RightAction,
  title,
}) => {
  const navigate = useNavigate()

  const shouldShowDefaultLeftAction = LeftAction !== false
  const DefaultLeftAction = (
    <button onClick={() => navigate(-1)}>
      <Icon icon={IconArrowBack} className="text-2xl leading-6" />
    </button>
  )

  const shouldShowDefaultRightAction = RightAction !== false
  const DefaultRightAction = <></>

  return (
    <div className="fixed top-0 left-0 z-50 w-full safe-top bg-white shadow-2 rounded-b-m">
      <header className="flex flex-row w-full justify-between items-center px-5 py-4">
        {/* Left Side Hamburger Menu */}
        <div className="h-6 w-6">
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
        <div className="h-6 w-6">
          {shouldShowDefaultRightAction
            ? RightAction || DefaultRightAction
            : null}
        </div>
      </header>
    </div>
  )
}
