import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ActionTitleLayout } from '@/layouts/ActionTitle'

export const PolicySettingsPage = () => {
  const { t } = useTranslation('settings')
  const { t: tCommon } = useTranslation('common')
  const navigate = useNavigate()

  return (
    <ActionTitleLayout
      header={{
        title: t('policy_page.header'),
        left: false,
        right: (
          <button className="font-bold" onClick={() => navigate(-1)}>
            {tCommon('done')}
          </button>
        ),
      }}
    >
      <div className="py-6 px-4">
        <h1 className="text-title-xl text-magenta-600">
          {t('policy_page.title')}
        </h1>
        <p className="text-title-s text-magenta-500">
          {t('policy_page.effective_date')}
        </p>
        <div className="my-3 text-magenta-600">{t('policy_page.content')}</div>
      </div>
    </ActionTitleLayout>
  )
}
