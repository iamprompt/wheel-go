import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { AnnouncementCard } from '@/components/AnnouncementCard'

export const AnnouncementsPage = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language as 'en' | 'th'

  return (
    <ActionTitleLayout
      header={{
        title: 'Announcements',
      }}
    >
      <Link to={`/announcements/id1`}>
        <AnnouncementCard
          title="The elevators are now renovating"
          location="Faculty of ICT, Mahidol University"
          tags={['building', 'incident']}
          timestamp="2023-01-28T02:00:00.000Z"
        />
      </Link>
      <Link to={`/announcements/id1`}>
        <AnnouncementCard
          title="The road beside the library is now constructing"
          location="Division of Physical System and Environment, Mahidol University"
          tags={['incident']}
          timestamp="2023-01-28T02:00:00.000Z"
        />
      </Link>
    </ActionTitleLayout>
  )
}
