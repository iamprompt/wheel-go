import { Button } from '@wheel-go/ui'
import { useNavigate } from 'react-router-dom'
import { HomeLayout } from '@/layouts/Home'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <HomeLayout className="w-full py-10 flex items-center justify-center flex-col">
      <div className="font-bold text-title-xxl mb-5">Not Found</div>
      <Button
        label="Go to Home"
        onClick={() => {
          navigate('/')
        }}
      />
    </HomeLayout>
  )
}
