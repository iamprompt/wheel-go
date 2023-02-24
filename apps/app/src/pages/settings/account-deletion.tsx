import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@wheel-go/ui'
import { ActionTitleLayout } from '@/layouts/ActionTitle'

export const AccountDeletionSettingsPage = () => {
  const { t } = useTranslation('settings')
  const navigate = useNavigate()

  return (
    <ActionTitleLayout
      header={{
        title: t('account_deletion_page.header'),
      }}
      className="py-6 px-4"
    >
      <h1 className="text-title-xl text-magenta-600 mb-3">
        {t('account_deletion_page.title')}
      </h1>
      <div className="text-magenta-600 mb-3 text-body-m">
        {t('account_deletion_page.description')}
      </div>
      <div className="mb-3 text-french-vanilla-500 text-body-s">
        {t('account_deletion_page.remark')}
      </div>
      <hr className="my-6 bg-soap-100" />
      <Button
        appearance="secondary"
        label={t('account_deletion_page.confirm_to_delete')}
        className="w-full"
        onClick={() => navigate('/')}
      />
    </ActionTitleLayout>
  )
}
