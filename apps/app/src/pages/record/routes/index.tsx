import { Icon } from '@iconify/react'
import { ActionTitleLayout } from '@/layouts/ActionTitle'
import { RouteItem } from '@/components/RouteItem'

export const ContributedRoutesPage = () => {
  return (
    <ActionTitleLayout
      header={{
        transparent: true,
      }}
    >
      <div className="mb-6 flex flex-col items-center gap-3">
        <div className=" inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-french-vanilla-100 bg-success-400 shadow-2">
          <Icon icon="ic:baseline-route" className="h-10 w-10 text-white" />
        </div>
        <div className="text-title-l text-success-400">Contributed Routes</div>
        <div className="text-subtext-l text-french-vanilla-500">20 routes</div>
      </div>
      <div className="divide-y divide-soap-100 border-y border-soap-100">
        {Array.from({ length: 3 }).map((_, index) => (
          <RouteItem key={index} />
        ))}
      </div>
    </ActionTitleLayout>
  )
}
