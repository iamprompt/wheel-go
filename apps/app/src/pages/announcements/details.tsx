import { useParams } from 'react-router-dom'
import { ActionTitleLayout } from '@/layouts/ActionTitle'

export const DetailAnnouncementPage = () => {
  const { id } = useParams()

  return (
    <ActionTitleLayout
      header={{
        transparent: true,
      }}
      fullScreen
    >
      <div className="relative aspect-[2/1] w-full max-h-40">
        <img
          src="https://mahidol.ac.th/temp/2018/09/009-2-1.jpg"
          className="w-full object-cover object-center h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
      </div>
      <div>
        <div>
          <div></div>
        </div>
      </div>
    </ActionTitleLayout>
  )
}
