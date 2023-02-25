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
  ...props
}) => {
  return (
    <BlankLayout className="safe-top safe-bottom">
      <HomeHeader />
      <main
        className={clsx(!fullScreen && 'pt-14 pb-20', 'relative min-h-screen')}
      >
        <div {...props}>{children}</div>
      </main>
      <BottomNavigation />
    </BlankLayout>
  )
}
