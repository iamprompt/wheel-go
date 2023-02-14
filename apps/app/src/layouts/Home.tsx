import type { FC } from 'react'
import { BlankLayout } from './Blank'
import { Header } from '@/components/Header'
import { BottomNavigation } from '@/components/BottomNavigation'

interface HomeLayoutProps {
  children: React.ReactNode
}

export const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <BlankLayout>
      <Header />
      <div>{children}</div>
      <BottomNavigation />
    </BlankLayout>
  )
}
