import type { FC } from 'react'
import { HomeLayout } from '@/layouts/Home'
import { ExploreMap } from '@/components/ExploreMap'

export const ExplorePage: FC = () => {
  return (
    <HomeLayout>
      {/* <div>Explore</div>
      <Link to="/page2">Page2</Link> */}
      <ExploreMap className="z-[1] h-screen w-screen" />
    </HomeLayout>
  )
}
