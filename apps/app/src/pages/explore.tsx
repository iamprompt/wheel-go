import type { FC } from 'react'
import { Link } from 'react-router-dom'

export const ExplorePage: FC = () => {
  return (
    <div>
      <div>Explore</div>
      <Link to="/page2">Page2</Link>
    </div>
  )
}
