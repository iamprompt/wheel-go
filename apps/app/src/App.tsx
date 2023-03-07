import type { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppProvider } from './contexts/useApp'
import { DeviceProvider } from './contexts/useDevice'
import { GeolocationProvider } from './contexts/useGeolocation'
import { AnnouncementsPage } from './pages/announcements'
import { DetailAnnouncementPage } from './pages/announcements/details'
import { ExplorePage } from './pages/explore'
import { FaqPage } from './pages/faq'
import { Page2 } from './pages/page2'
import { RecordPage } from './pages/record'
import { FavoritePlacesPage } from './pages/record/favorites'
import { ReviewPlacesPage } from './pages/record/reviews'
import { ContributedRoutesPage } from './pages/record/routes'
import { SettingsPage } from './pages/settings'
import { AccountDeletionSettingsPage } from './pages/settings/account-deletion'
import { LanguageSettingsPage } from './pages/settings/languages'
import { PolicySettingsPage } from './pages/settings/policy'
import { TracePage } from './pages/trace'
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
    path: '/settings',
    children: [
      {
        index: true,
        element: <SettingsPage />,
      },
      {
        path: 'languages',
        element: <LanguageSettingsPage />,
      },
      {
        path: 'policy',
        element: <PolicySettingsPage />,
      },
      {
        path: 'delete-account',
        element: <AccountDeletionSettingsPage />,
      },
    ],
  },
  {
    path: '/faq',
    element: <FaqPage />,
  },
  {
    path: '/announcements',
    children: [
      {
        index: true,
        element: <AnnouncementsPage />,
      },
      {
        path: ':id',
        element: <DetailAnnouncementPage />,
      },
    ],
  },
  {
    path: '/trace',
    children: [
      {
        index: true,
        element: <TracePage />,
      },
    ],
  },
  {
    path: '/records',
    children: [
      {
        index: true,
        element: <RecordPage />,
      },
      {
        path: 'favorites',
        children: [
          {
            index: true,
            element: <FavoritePlacesPage />,
          },
        ],
      },
      {
        path: 'reviews',
        children: [
          {
            index: true,
            element: <ReviewPlacesPage />,
          },
        ],
      },
      {
        path: 'routes',
        children: [
          {
            index: true,
            element: <ContributedRoutesPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const App: FC = () => {
  return (
    <>
      <AppProvider>
        <DeviceProvider>
          <GeolocationProvider>
            <RouterProvider router={router} />
          </GeolocationProvider>
        </DeviceProvider>
      </AppProvider>
    </>
  )
}

export default App
