import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { HomeLayout } from '@/layouts/Home'

export const ExplorePage: FC = () => {
  return (
    <HomeLayout>
      <div>Explore</div>
      <Link to="/page2">Page2</Link>
    </HomeLayout>
  )
}
