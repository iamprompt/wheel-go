import { Icon } from '@iconify/react'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { PlaceItemWithRating } from '@/components/PlaceItemWithRating'

export const FavoritePlacesPage = () => {
  return (
    <ActionTitleLayout
      header={{
        transparent: true,
      }}
    >
      <div className="mb-6 flex flex-col items-center gap-3">
        <div className=" inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-french-vanilla-100 bg-pomegranate-300 shadow-2">
          <Icon icon="ic:baseline-favorite" className="h-10 w-10 text-white" />
        </div>
        <div className="text-title-l text-pomegranate-300">Favorite Places</div>
        <div className="text-subtext-l text-french-vanilla-500">3 places</div>
      </div>
      <div className="divide-y divide-soap-100 border-y border-soap-100">
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
