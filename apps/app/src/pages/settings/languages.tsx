import { useNavigate } from 'react-router-dom'
import { ActionTitleLayout } from '@/layouts/ActionTitle'

export const LanguageSettingsPage = () => {
  const navigate = useNavigate()

  return (
    <ActionTitleLayout
      header={{
        title: 'Language / ภาษา',
        left: false,
        right: (
          <button
            className="font-bold"
            onClick={() => {
              console.log('done')
              navigate('/settings')
            }}
          >
            Done
          </button>
        ),
      }}
    ></ActionTitleLayout>
  )
}
