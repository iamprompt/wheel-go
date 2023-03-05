import { Icon } from '@iconify/react'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { PlaceItemWithRating } from '@/components/PlaceItemWithRating'

export const ReviewPlacesPage = () => {
  return (
    <ActionTitleLayout
      header={{
        transparent: true,
      }}
    >
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className=" bg-warning-400 border-2 border-french-vanilla-100 inline-flex items-center justify-center h-16 w-16 shadow-2 rounded-full">
          <Icon icon="ic:baseline-favorite" className="w-10 h-10 text-white" />
        </div>
        <div className="text-title-l text-warning-400">Place Reviews</div>
        <div className="text-subtext-l text-french-vanilla-500">15 reviews</div>
      </div>
      <div className="border-y border-soap-100 divide-y divide-soap-100">
        {Array.from({ length: 3 }).map((_, index) => (
          <PlaceItemWithRating
            key={index}
            title="The Coffee Bean & Tea Leaf"
            rating={4.5}
            date="2021-05-01"
          />
        ))}
      </div>
    </ActionTitleLayout>
  )
}
