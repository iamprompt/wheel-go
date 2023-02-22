import { useNavigate } from 'react-router-dom'
import { RadioGroup } from '@headlessui/react'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import IconRadioUnchecked from '@iconify/icons-ic/outline-radio-button-unchecked'
import IconRadioChecked from '@iconify/icons-ic/outline-radio-button-checked'
import { useTranslation } from 'react-i18next'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { AvailableLanguages } from '@/const/Languages'
import { useApp } from '@/contexts/useApp'

export const LanguageSettingsPage = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const { appLanguage, setAppLanguage } = useApp()
  const [selectedLanguage, setSelectedLanguage] = useState(appLanguage)

  console.log('appLanguage', appLanguage, 'selectedLanguage', selectedLanguage)

  const handleLanguageChange = async (language: string) => {
    console.log('language', language)
    await setAppLanguage(language)
    navigate('/settings')
  }

  return (
    <ActionTitleLayout
      header={{
        title: 'Language / ภาษา',
        left: false,
        right: (
          <button
            className="font-bold"
            onClick={() => handleLanguageChange(selectedLanguage)}
          >
            {t('done')}
          </button>
        ),
      }}
    >
      <RadioGroup
        value={selectedLanguage}
        onChange={setSelectedLanguage}
        className="divide-y divide-soap-100 border-y border-soap-100"
      >
        {AvailableLanguages.map((language) => (
          <RadioGroup.Option
            key={language.code}
            value={language.code}
            className="flex flex-row items-center justify-between px-4 py-3 text-sm font-bold w-full cursor-pointer"
          >
            {({ checked }) => (
              <>
                <span className="text-magenta-600">{language.name}</span>
                <span>
                  <Icon
                    icon={checked ? IconRadioChecked : IconRadioUnchecked}
                    className="w-6 h-6 text-magenta-500"
                  />
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </ActionTitleLayout>
  )
}
