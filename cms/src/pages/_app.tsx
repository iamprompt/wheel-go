import '~/styles/globals.css'
import '~/utils/i18n'
import '~/utils/dayjs'
import type { AppProps } from 'next/app'

import { MantineProvider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { LoadScript } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next'

import { env } from '~/utils/env'
import { Button } from '~/components/Button'
import { Navbar } from '~/components/Navbar'
import { Tutorial } from '~/components/Tutorial'
import { WheelGoApolloProvider } from '~/context/apollo'
import { AuthProvider } from '~/context/useAuth'

function App({ Component, pageProps, router }: AppProps) {
  const { t } = useTranslation('dashboard')
  const isLogin = router.pathname === '/login'
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
        fontFamily: 'LINE Seed Sans TH',
      }}
    >
      <LoadScript googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <WheelGoApolloProvider>
          <AuthProvider>
            {!isLogin && (
              <>
                <Navbar />
                <div className="h-[100px]" />
                <Button
                  type="button"
                  appearance="primary"
                  className="fixed bottom-8 right-8 z-10 cursor-pointer px-4 py-2"
                  icon="ic:round-menu-book"
                  iconPosition="right"
                  label={t('tutorial') as string}
                  onClick={open}
                />
              </>
            )}
            <Tutorial opened={opened} close={close} />
            <div className={!isLogin ? 'm-auto max-w-[90rem] px-4 py-6' : ''}>
              <Component {...pageProps} />
            </div>
          </AuthProvider>
        </WheelGoApolloProvider>
      </LoadScript>
    </MantineProvider>
  )
}

export default App
