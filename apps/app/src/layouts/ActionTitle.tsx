import type { ComponentProps, FC } from 'react'
import clsx from 'clsx'
import { BlankLayout } from './Blank'
import { Header } from '@/components/Header'

interface ActionTitleLayoutProps extends ComponentProps<'div'> {
  fullScreen?: boolean
  header: ComponentProps<typeof Header>
}

export const ActionTitleLayout: FC<ActionTitleLayoutProps> = ({
  children,
  fullScreen,
  header,
  ...props
}) => {
  return (
    <BlankLayout className="safe-top safe-bottom">
      <Header {...header} />
      <main className={clsx(!fullScreen && 'pt-14', 'min-h-screen relative')}>
        <div {...props}>{children}</div>
      </main>
    </BlankLayout>
  )
}
