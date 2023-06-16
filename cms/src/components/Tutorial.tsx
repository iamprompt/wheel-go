import { useState } from 'react'

import { Image, Modal } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { timeout } from '~/utils/calculate'
import { Button } from '~/components/Button'

const MAX_STEP = 12

export function Tutorial({ opened, close }: any) {
  const { t } = useTranslation('table')
  const [step, setStep] = useState(1)

  const onClose = async () => {
    close()
    await timeout(1000)
    setStep(1)
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      withCloseButton={false}
      size={1452}
    >
      <div className="p-2 text-title-xl">วิธีใช้งานระบบแดชบอร์ด</div>
      <div className="h-[480px] w-full">
        <Image
          alt="tutorial"
          src={`/images/tutorial/tutorial-${step}.png`}
          className="object-contain px-4"
        />
      </div>
      <div className="flex justify-between">
        {step < MAX_STEP && (
          <Button
            appearance="secondary"
            label={t('close') as string}
            className="z-10 cursor-pointer px-20 py-3"
            onClick={onClose}
          />
        )}
        {step === MAX_STEP && <div />}

        <div className="flex gap-4">
          {step > 1 && (
            <Button
              appearance="secondary"
              label={t('previous') as string}
              className="z-10 cursor-pointer px-20 py-3"
              onClick={() => {
                setStep(step - 1)
              }}
            />
          )}
          {step < MAX_STEP && (
            <Button
              appearance="primary"
              label={t('next') as string}
              className="z-10 cursor-pointer px-20 py-3"
              onClick={() => {
                setStep(step + 1)
              }}
            />
          )}
          {step === MAX_STEP && (
            <Button
              appearance="primary"
              label={t('close') as string}
              className="z-10 cursor-pointer px-20 py-3"
              onClick={onClose}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
