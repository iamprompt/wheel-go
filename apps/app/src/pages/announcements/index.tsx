import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { AnnouncementCard } from '@/components/AnnouncementCard'
import { MAnnouncements } from '@/utils/mock'

export const AnnouncementsPage = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language as 'en' | 'th'

  const items = MAnnouncements[currentLanguage]

  return (
    <ActionTitleLayout
      header={{
        title: 'Announcements',
      }}
    >
      {items.map((item) => (
        <Link to={`/announcements/${item.id}`} key={item.id}>
          <AnnouncementCard
            title={item.title}
            location={item.location}
            tags={item.tags}
            timestamp={item.timestamp}
          />
        </Link>
      ))}
    </ActionTitleLayout>
  )
}
