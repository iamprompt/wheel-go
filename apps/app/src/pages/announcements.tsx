import { useTranslation } from 'react-i18next'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { AnnouncementItem } from '@/components/AnnouncementItem'

export const AnnouncementsPage = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language as 'en' | 'th'

  return (
    <ActionTitleLayout
      header={{
        title: 'Announcements',
      }}
    >
      <AnnouncementItem
        title="Announcement 1"
        location="Location 1"
        type="Type 1"
        timestamp="2021-09-01T00:00:00.000Z"
      />
      <AnnouncementItem
        title="Announcement 2"
        location="Location 2"
        type="Type 2"
        timestamp="2021-09-02T00:00:00.000Z"
      />
    </ActionTitleLayout>
  )
}
