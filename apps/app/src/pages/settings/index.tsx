import { useNavigate } from 'react-router-dom'
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from 'capacitor-native-settings'
import { Button } from '@wheel-go/ui'
import { useTranslation } from 'react-i18next'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { SettingListItem } from '@/components/SettingListItem'
import { useApp } from '@/contexts/useApp'
import { AvailableLanguages } from '@/const/Languages'

export const SettingsPage = () => {
  const { t } = useTranslation('settings')
  const { t: tCommon } = useTranslation('common')
  const navigate = useNavigate()
  const { appLanguage } = useApp()

  const handleOpenNativeSettings = () => {
    NativeSettings.open({
      optionAndroid: AndroidSettings.ApplicationDetails,
      optionIOS: IOSSettings.App,
    })
  }

  console.log('appLanguage', appLanguage)

  return (
    <ActionTitleLayout
      header={{
        title: t('settings_title'),
        left: false,
        right: (
          <button
            className="font-bold"
            onClick={() => {
              console.log('done')
              navigate('/')
            }}
          >
            {tCommon('done')}
          </button>
        ),
      }}
    >
      <div className="relative flex flex-col items-center space-y-6 pt-6 pb-10">
        {/* General */}
        <div className="w-full">
          <div className="mb-2 px-4 text-sm font-bold text-french-vanilla-500">
            {t('general_section')}
          </div>
          <div className="divide-y divide-soap-100 border-y border-soap-100">
            <SettingListItem
              label={t('general_language')}
              value={
                AvailableLanguages.find((lang) => lang.code === appLanguage)
                  ?.name || ''
              }
              onClick={() => {
                navigate('/settings/languages')
              }}
            />
          </div>
        </div>

        {/* Privacy */}
        <div className="w-full">
          <div className="mb-2 px-4 text-sm font-bold text-french-vanilla-500">
            {t('privacy_section')}
          </div>
          <div className="divide-y divide-soap-100 border-y border-soap-100">
            <SettingListItem
              label={t('privacy_data_allowance')}
              onClick={handleOpenNativeSettings}
            />
            <SettingListItem
              label={t('privacy_terms_and_policy')}
              onClick={() => {
                navigate('/settings/policy')
              }}
            />
          </div>
        </div>

        {/* Account */}
        <div className="w-full">
          <div className="mb-2 px-4 text-sm font-bold text-french-vanilla-500">
            {t('about_section')}
          </div>
          <div className="divide-y divide-soap-100 border-y border-soap-100">
            <SettingListItem
              label={t('about_version')}
              value="0.0.1"
              icon={false}
            />
            <SettingListItem
              label={t('about_copyright')}
              value={t('about_copyright_value')}
              icon={false}
            />
          </div>
        </div>

        <div className="mt-8 w-full">
          <div className="mb-2 px-4 text-sm font-bold text-french-vanilla-500">
            {t('support_section')}
          </div>
          <div className="divide-y divide-soap-100 border-y border-soap-100">
            <div className="flex w-full flex-row items-center justify-center gap-6 p-4 font-bold">
              <img src="/images/partner/ict_logo.png" alt="" />
              <img src="/images/partner/mu_physystem_logo.png" alt="" />
              <img src="/images/partner/mu_dss_logo.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 px-4">
        <Button
          className="w-full"
          appearance="secondary"
          label={t('delete_account')}
          onClick={() => {
            navigate('/settings/delete-account')
          }}
        />
      </div>
    </ActionTitleLayout>
  )
}
