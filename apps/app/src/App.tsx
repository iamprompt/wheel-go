import type { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { DeviceProvider } from './contexts/useDevice'
import { GeolocationProvider } from './contexts/useGeolocation'
import { ExplorePage } from './pages/explore'
import { Page2 } from './pages/page2'
import { NotFound } from './pages/_notFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExplorePage />,
  },
  {
    path: '/page2',
    element: <Page2 />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const App: FC = () => {
  return (
    <>
      <DeviceProvider>
        <GeolocationProvider>
          <RouterProvider router={router} />
        </GeolocationProvider>
      </DeviceProvider>
    </>
  )
}

export default App
