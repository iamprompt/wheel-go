import { useTranslation } from 'react-i18next'
import { ActionTitleLayout } from '@/layouts/ActionTitle'

export const AnnouncementsPage = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language as 'en' | 'th'

  return (
    <ActionTitleLayout
      header={{
        title: 'Announcements',
      }}
    ></ActionTitleLayout>
  )
}
