import type { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ExplorePage } from './pages/explore'
import { Page2 } from './pages/page2'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExplorePage />,
  },
  {
    path: '/page2',
    element: <Page2 />,
  },
])

const App: FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
