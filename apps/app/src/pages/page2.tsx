import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '@wheel-go/ui'
import i18next from 'i18next'
import { HomeLayout } from '@/layouts/Home'

export const Page2 = () => {
  const { t } = useTranslation('common')

  return (
    <HomeLayout className="py-5">
      <Link to="/">{t('go_page', { page: 'หน้าหลัก' })}</Link>
      <Button
        label={t('change_language')}
        onClick={() => {
          const langs = i18next.languages
          if (langs[0] === 'en') {
            i18next.changeLanguage('th')
          } else {
            i18next.changeLanguage('en')
          }
        }}
      />
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i}>{t('app_name')}</div>
      ))}
    </HomeLayout>
  )
}
