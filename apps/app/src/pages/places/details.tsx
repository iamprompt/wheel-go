import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { MPlacesDetails } from '@/utils/mock'

const Facilities = {
  ramp: {
    name: 'Ramp',
    icon: 'ic:round-signal-cellular-4-bar',
  },
  assistant: {
    name: 'Assistant',
    icon: 'ic:round-wheelchair-pickup',
  },
  toilet: {
    name: 'Toilet',
    icon: 'ic:round-wc',
  },
  elevator: {
    name: 'Elevator',
    icon: 'ic:round-elevator',
  },
  parking: {
    name: 'Parking',
    icon: 'ic:round-local-parking',
  },
  surface: {
    name: 'Surface',
    icon: 'ic:round-texture',
  },
}

export const DetailPlacesPage = () => {
  const { id } = useParams<{ id: string }>()
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.language as 'en' | 'th'

  const item = MPlacesDetails[currentLanguage].find(
    (announcement) => announcement.id === id
  )

  if (!item) {
    return null
  }

  return (
    <ActionTitleLayout
      header={{
        transparent: true,
      }}
      fullScreen
    >
      <div className="relative aspect-[2/1] max-h-40 w-full">
        <img
          src={item.image}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
      </div>
      <div>
        <div className="flex flex-col items-start space-y-3 bg-gradient-1 p-4 text-white">
          <div className="flex items-center">
            <img
              src={`/images/places/icon/${item.type}.png`}
              alt={item.type}
              className="h-5 w-5"
            />
            <span className="ml-2 text-title-xs">{item.type}</span>
          </div>
          <div>
            <span className="text-title-l">{item.title}</span>
          </div>
        </div>
        <div className="divide-y divide-soap-100 px-4">
          <div className="py-6">
            <div className="mb-3 text-title-s">Address</div>
            <div className="text-body-s text-french-vanilla-500">
              {item.address}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 py-6">
            <div className="flex flex-col items-center">
              <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-magenta-500">
                <Icon
                  icon="ic:baseline-location-on"
                  className="h-5 w-5 text-white"
                />
              </button>
              <span className="mt-1 text-center text-body-s text-french-vanilla-500">
                Show on Map
              </span>
            </div>
            <div className="flex flex-col items-center">
              <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-magenta-500">
                <Icon icon="ic:baseline-call" className="h-5 w-5 text-white" />
              </button>
              <span className="mt-1 text-center text-body-s text-french-vanilla-500">
                Contact
              </span>
            </div>
            <div className="flex flex-col items-center">
              <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-magenta-500">
                <Icon icon="ic:baseline-link" className="h-5 w-5 text-white" />
              </button>
              <span className="mt-1 text-center text-body-s text-french-vanilla-500">
                Website
              </span>
            </div>
            <div className="flex flex-col items-center">
              <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-magenta-500">
                <Icon icon="ic:baseline-share" className="h-5 w-5 text-white" />
              </button>
              <span className="mt-1 text-center text-body-s text-french-vanilla-500">
                Share
              </span>
            </div>
          </div>
        </div>
        <div className="h-3 bg-soap-100" />
        <div className="divide-y divide-soap-100 px-4">
          <div className="py-6">
            <div className="mb-3 flex items-baseline justify-between text-title-s">
              <div>Facilities</div>
              <div className="text-body-s text-info-400">See Details</div>
            </div>
            <div className="flex flex-row justify-between gap-5">
              {Object.entries(Facilities).map(([key, value]) => (
                <div className="divide-y divide-soap-100" key={key}>
                  <div className="flex h-6 w-6 items-center justify-center pb-1">
                    <Icon icon={value.icon} className="h-6 w-6" />
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center pt-1">
                    <Icon
                      icon="ic:round-check-circle"
                      className="h-4 w-4 text-success-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ActionTitleLayout>
  )
}
