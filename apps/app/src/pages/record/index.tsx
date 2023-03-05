import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { ActionTitleLayout } from '@/layouts/ActionTitle'

export const RecordPage = () => {
  const navigate = useNavigate()
  return (
    <ActionTitleLayout
      header={{
        title: 'Records',
        left: false,
      }}
      bottomNav={true}
    >
      <div className="px-4 py-6 text-title-s">Your lists</div>
      <ul className="border border-t border-soap-100 divide-y divide-soap-100">
        <li
          className="py-3 px-4 flex flex-row justify-between items-center"
          onClick={() => {
            navigate('/records/favorites')
          }}
        >
          <div className="flex flex-row gap-3 items-center">
            <Icon
              icon="ic:baseline-favorite-border"
              className="w-6 h-6 text-pomegranate-300"
            />
            <div>
              <div className="text-title-xs">Favorite Places</div>
              <div className="text-subtext-m text-french-vanilla-500">
                3 places
              </div>
            </div>
          </div>
          <div>
            <Icon
              icon="ic:baseline-chevron-right"
              className="w-6 h-6 text-french-vanilla-300"
            />
          </div>
        </li>
        <li
          className="py-3 px-4 flex flex-row justify-between items-center"
          onClick={() => {
            navigate('/records/reviews')
          }}
        >
          <div className="flex flex-row gap-3 items-center">
            <Icon
              icon="ic:baseline-star-outline"
              className="w-6 h-6 text-warning-400"
            />
            <div>
              <div className="text-title-xs">Place Reviews</div>
              <div className="text-subtext-m text-french-vanilla-500">
                15 reviews
              </div>
            </div>
          </div>
          <div>
            <Icon
              icon="ic:baseline-chevron-right"
              className="w-6 h-6 text-french-vanilla-300"
            />
          </div>
        </li>
        <li className="py-3 px-4 flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3 items-center">
            <Icon
              icon="ic:baseline-route"
              className="w-6 h-6 text-success-400"
            />
            <div>
              <div className="text-title-xs">Contributed Routes</div>
              <div className="text-subtext-m text-french-vanilla-500">
                20 routes
              </div>
            </div>
          </div>
          <div>
            <Icon
              icon="ic:baseline-chevron-right"
              className="w-6 h-6 text-french-vanilla-300"
            />
          </div>
        </li>
      </ul>
    </ActionTitleLayout>
  )
}
