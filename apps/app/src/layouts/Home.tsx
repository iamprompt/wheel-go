import type { ComponentProps, FC } from 'react'
import clsx from 'clsx'
import { BlankLayout } from './Blank'
import { HomeHeader } from '@/components/HomeHeader'
import { BottomNavigation } from '@/components/BottomNavigation'

interface HomeLayoutProps extends ComponentProps<'div'> {
  fullScreen?: boolean
}

export const HomeLayout: FC<HomeLayoutProps> = ({
  children,
  fullScreen,
  className,
  ...props
}) => {
  return (
    <BlankLayout>
      <HomeHeader />
      <main className={clsx(!fullScreen && 'safe-top safe-bottom', 'relative')}>
        <div
          className={clsx(!fullScreen && 'pt-14 pb-20', className)}
          {...props}
        >
          {children}
        </div>
      </main>
      <BottomNavigation />
    </BlankLayout>
  )
}
