import type { FC } from 'react'

interface BlankLayoutProps {
  children: React.ReactNode
}

export const BlankLayout: FC<BlankLayoutProps> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
