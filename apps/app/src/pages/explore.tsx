import type { FC } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { GoToCurrentLocationButton } from './trace'
import { HomeLayout } from '@/layouts/Home'
import { ExploreMap } from '@/components/ExploreMap'

export const ExplorePage: FC = () => {
  const navigate = useNavigate()

  return (
    <HomeLayout fullScreen>
      {/* <div>Explore</div>
      <Link to="/page2">Page2</Link> */}
      <ExploreMap className="z-[1] h-screen w-screen">
        <div className="safe-top safe-bottom absolute inset-0">
          <div className="relative h-full pt-14 pb-20">
            <div className="right-0 absolute p-4 space-y-2 z-[450]">
              <div className="flex flex-col rounded-m overflow-hidden divide-y divide-soap-100 shadow-2">
                <button className="bg-white w-11 h-11 flex items-center justify-center">
                  <Icon icon="ic:round-route" className="w-5 h-5" />
                </button>
                <GoToCurrentLocationButton />
              </div>
              <div className="flex flex-col rounded-m overflow-hidden divide-y divide-soap-100 shadow-2">
                <button
                  onClick={() => {
                    navigate('/trace')
                  }}
                  className="bg-white w-11 h-11 flex items-center justify-center"
                >
                  <Icon icon="ic:round-draw" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ExploreMap>
      {/* <div className="safe-top safe-bottom absolute inset-0">
        <div className="relative h-full pt-14 pb-20">
          <div className="right-0 absolute p-4 space-y-2 z-10">
            <div className="flex flex-col rounded-m overflow-hidden divide-y divide-soap-100 shadow-2">
              <button className="bg-white w-11 h-11 flex items-center justify-center">
                <Icon icon="ic:round-route" className="w-5 h-5" />
              </button>
              <button className="bg-white w-11 h-11 flex items-center justify-center">
                <Icon icon="ic:round-near-me" className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col rounded-m overflow-hidden divide-y divide-soap-100 shadow-2">
              <button
                onClick={() => {
                  navigate('/trace')
                }}
                className="bg-white w-11 h-11 flex items-center justify-center"
              >
                <Icon icon="ic:round-draw" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </HomeLayout>
  )
}
