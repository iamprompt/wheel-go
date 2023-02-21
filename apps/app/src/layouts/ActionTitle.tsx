import type { ComponentProps, FC } from 'react'
import clsx from 'clsx'
import { BlankLayout } from './Blank'
import { Header } from '@/components/Header'
import { BottomNavigation } from '@/components/BottomNavigation'

interface ActionTitleLayoutProps extends ComponentProps<'div'> {
  fullScreen?: boolean
}

export const ActionTitleLayout: FC<ActionTitleLayoutProps> = ({
  children,
  fullScreen,
  ...props
}) => {
  return (
    <BlankLayout className="safe-top safe-bottom">
      <Header title={'Settings'} />
      <main
        className={clsx(!fullScreen && 'pt-14 pb-20', 'min-h-screen relative')}
      >
        <div {...props}>{children}</div>
      </main>
      <BottomNavigation />
    </BlankLayout>
  )
}
