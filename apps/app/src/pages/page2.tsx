import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '@wheel-go/ui'
import i18next from 'i18next'

export const Page2 = () => {
  const { t } = useTranslation('common')

  return (
    <div>
      <div>{t('app_name')}</div>
      <Link to="/">{t('go_page', { page: '2' })}</Link>
      <Button
        onClick={() => {
          const langs = i18next.languages
          if (langs[0] === 'en') {
            i18next.changeLanguage('th')
          } else {
            i18next.changeLanguage('en')
          }
        }}
      />
    </div>
  )
}
