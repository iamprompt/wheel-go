import type { ComponentProps, FC } from 'react'
import clsx from 'clsx'
import { BlankLayout } from './Blank'
import { HomeHeader } from '@/components/HomeHeader'

interface HeaderLayoutProps extends ComponentProps<'div'> {
  fullScreen?: boolean
}

export const HeaderLayout: FC<HeaderLayoutProps> = ({
  children,
  fullScreen,
  className,
  ...props
}) => {
  return (
    <BlankLayout>
      <HomeHeader menu={false} search={false} />
      <main className={clsx(!fullScreen && 'safe-top safe-bottom')}>
        <div
          className={clsx(!fullScreen && 'pt-14 pb-20', className)}
          {...props}
        >
          {children}
        </div>
      </main>
    </BlankLayout>
  )
}
