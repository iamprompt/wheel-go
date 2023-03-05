import type { ComponentProps, FC } from 'react'
import clsx from 'clsx'
import { BlankLayout } from './Blank'
import { Header } from '@/components/Header'
import { BottomNavigation } from '@/components/BottomNavigation'

interface ActionTitleLayoutProps extends ComponentProps<'div'> {
  fullScreen?: boolean
  bottomNav?: boolean
  header: ComponentProps<typeof Header>
}

export const ActionTitleLayout: FC<ActionTitleLayoutProps> = ({
  children,
  fullScreen,
  className,
  bottomNav,
  header,
  ...props
}) => {
  return (
    <BlankLayout>
      <Header {...header} />
      <main className={clsx(!fullScreen && 'safe-top safe-bottom', 'relative')}>
        <div className={clsx(!fullScreen && 'pt-14', className)} {...props}>
          {children}
        </div>
      </main>
      {bottomNav ? <BottomNavigation /> : null}
    </BlankLayout>
  )
}
