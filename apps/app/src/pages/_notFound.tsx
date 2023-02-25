import { Button } from '@wheel-go/ui'
import { useNavigate } from 'react-router-dom'
import { HomeLayout } from '@/layouts/Home'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <HomeLayout>
      <div className="flex w-full flex-col items-center justify-center py-10">
        <div className="mb-5 text-title-xxl font-bold">Not Found</div>
        <Button
          label="Go to Home"
          onClick={() => {
            navigate('/')
          }}
        />
      </div>
    </HomeLayout>
  )
}
