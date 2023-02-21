import type { ComponentProps, FC } from 'react'

interface BlankLayoutProps extends ComponentProps<'div'> {}

export const BlankLayout: FC<BlankLayoutProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}
