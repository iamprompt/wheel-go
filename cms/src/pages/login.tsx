import type { FC } from 'react'
import Image from 'next/image'

import { PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'

import { Button } from '~/components/Button'
import { useAuth } from '~/context/useAuth'

const Login: FC = () => {
  const { signin } = useAuth()
  const { t } = useTranslation('login')

  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const handleSubmit = onSubmit((values) => {
    console.log(values)

    signin(values.email, values.password)
  })

  return (
    <div className="grid h-screen w-screen grid-cols-2">
      <div className="m-auto max-w-[90rem]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center space-y-6">
            <div>
              <Image
                priority
                src="/images/mahidol-logo.svg"
                height={64}
                width={256}
                alt="MU Logo"
              />
              <Image
                priority
                src="/images/wheel-go-logo.svg"
                height={48}
                width={150}
                alt="WheelGo Logo"
              />
            </div>
            <TextInput
              label={t('email')}
              placeholder={t('email_placeholder') as string}
              className="w-full"
              withAsterisk
              {...getInputProps('email')}
            />
            <PasswordInput
              label={t('password')}
              placeholder={t('password_placeholder') as string}
              withAsterisk
              className="w-full"
              {...getInputProps('password')}
            />
            {/* <Link href={'/dashboard'} className="w-full"> */}
            <Button
              label={t('login') as string}
              type="submit"
              appearance="primary"
              className="w-full cursor-pointer py-3"
            />
            {/* </Link> */}
            {/* <Button
              label={t('continue_with_mu') as string}
              type="button"
              appearance="secondary"
              className="w-full cursor-pointer py-3"
            /> */}
            <Button
              label={t('forgot_password') as string}
              type="button"
              appearance="none"
              className="text-title-s text-info-500 underline"
              cursorPointer
            />
          </div>
        </form>
      </div>
      <div className="flex justify-center overflow-hidden bg-magenta-600">
        <Image
          priority
          src="/images/wheelchair.svg"
          height={960}
          width={1080}
          alt="WheelChair"
        />
      </div>
    </div>
  )
}

export default Login
