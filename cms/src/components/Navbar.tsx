import Image from 'next/image'
import { useRouter } from 'next/router'

import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

import { Button } from '~/components/Button'

export function Navbar() {
  const router = useRouter()
  const { t, i18n } = useTranslation('navbar')

  const links = [
    {
      name: t('dashboard'),
      href: '/dashboard',
    },
    {
      name: t('announcement'),
      href: '/announcement',
    },
    {
      name: t('place'),
      href: '/place',
    },
    {
      name: t('review'),
      href: '/review',
    },
  ]

  return (
    <nav className="fixed z-10 flex w-full items-center justify-between gap-6 bg-french-vanilla-100 p-6 text-title-m shadow-md">
      <a href={links[0]?.href ?? '#'}>
        <Image
          priority
          src="/images/wheel-go-logo.svg"
          height={48}
          width={210}
          alt="WheelGo Logo"
        />
      </a>
      <div className="flex items-center gap-6">
        <div className="flex gap-6">
          {links.map(({ href, name }) => (
            <a
              key={href}
              href={href}
              className={
                router.asPath === href
                  ? 'text-magenta-400 no-underline'
                  : 'text-french-vanilla-500 no-underline hover:text-magenta-600'
              }
            >
              {name}
            </a>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="text-title-s">Admin</div>
          <div className="text-body-s">Logged in</div>
        </div>
        <a href="/login" className="no-underline">
          <Button
            appearance="secondary"
            label={t('sign_out') as string}
            cursorPointer
          />
        </a>
        <div className="flex items-center text-title-m">
          <Button
            appearance="none"
            label="EN"
            cursorPointer
            className={
              i18n.language === 'en'
                ? 'text-magenta-400'
                : 'text-french-vanilla-500 hover:text-magenta-600'
            }
            onClick={() => i18next.changeLanguage('en')}
          />
          <span className="font-normal text-french-vanilla-500">|</span>
          <Button
            appearance="none"
            label="ภาษาไทย"
            cursorPointer
            className={
              i18n.language === 'th'
                ? 'text-magenta-400'
                : 'text-french-vanilla-500 hover:text-magenta-600'
            }
            onClick={() => i18next.changeLanguage('th')}
          />
        </div>
      </div>
    </nav>
  )
}
