import { Disclosure } from '@headlessui/react'
import { Icon } from '@iconify/react'

import IconRemove from '@iconify/icons-material-symbols/remove-rounded'
import IconAdd from '@iconify/icons-material-symbols/add-rounded'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { FaqQuestions } from '@/const/Faq'

export const FaqPage = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language as 'en' | 'th'

  return (
    <ActionTitleLayout
      header={{
        title: 'FAQ',
      }}
    >
      <div className="px-6 pt-6">
        <h1 className="text-title-l">Frequently Asked Questions</h1>
        {/* Accordian */}
        <div className="mt-3 divide-y">
          {FaqQuestions.map((faq, i) => (
            <Disclosure as="div" key={`faq-${i + 1}`}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between py-2 text-left text-base font-bold text-black focus:outline-none focus-visible:ring">
                    <span className="text-title-s">
                      {faq.question[currentLanguage]}
                    </span>

                    <Icon
                      icon={open ? IconRemove : IconAdd}
                      className={clsx('h-5 w-5 text-french-vanilla-300')}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pb-3 text-body-s">
                    {faq.answer[currentLanguage]}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
        <div className="text-theme-description mt-3 text-xs">
          Can&apos;t find an answer to your questions? Feel free to contact us
          at{' '}
          <a
            href="mailto:wheelgo.muict@gmail.com"
            className="text-theme-magenta underline"
          >
            wheelgo.muict@gmail.com
          </a>
        </div>
      </div>
    </ActionTitleLayout>
  )
}
