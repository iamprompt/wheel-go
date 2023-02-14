import type { FC } from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom'

// Icons
import { Icon } from '@iconify/react'
import IconMenu from '@iconify/icons-material-symbols/menu-rounded'
import IconSearch from '@iconify/icons-material-symbols/search-rounded'
import { SideNavigation } from './SideNavigation'
import { WheelGoWordMark } from './WheelGoWordMark'

interface HeaderProps {
  menu?: boolean
  search?: boolean
}

export const Header: FC<HeaderProps> = ({ menu = true, search = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <div className="fixed top-0 left-0 z-50 w-full safe-top bg-white shadow-2 rounded-b-m">
      <header className="flex flex-row w-full justify-between items-center px-5 py-3">
        {/* Left Side Hamburger Menu */}
        <div className="h-6 w-6">
          {menu ? (
            <>
              <button onClick={() => setIsMenuOpen(true)}>
                <Icon icon={IconMenu} className="h-6 w-6" />
              </button>
              <SideNavigation
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                // onSignIn={toggleSignInDialog}
              />
            </>
          ) : null}
        </div>
        {/* Center Logo */}
        <div className="shrink-0 p-[1px]">
          <WheelGoWordMark className="h-6" variant="light" />
        </div>
        {/* Right Side Action Button */}
        <div className="h-6 w-6">
          {search ? (
            <Link to="/search">
              <Icon icon={IconSearch} className="h-6 w-6" />
            </Link>
          ) : null}
        </div>
      </header>
    </div>
  )
}
