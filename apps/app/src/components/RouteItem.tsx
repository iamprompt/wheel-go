import { Icon } from '@iconify/react'

export const RouteItem = () => {
  return (
    <div className="flex flex-row items-center justify-between py-6 px-4">
      <div className="space-y-2">
        <div className="flex flex-row items-baseline gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-info-400">
            <Icon
              icon="ic:baseline-apartment"
              className="h-3 w-3 text-info-400"
            />
          </div>
          <span className="w-9 text-title-xs text-french-vanilla-500">
            From
          </span>
          <span className="text-body-m">
            Faculty of Information and Com ...
          </span>
        </div>
        <div className="flex w-6 items-center justify-center">
          <div className="h-4 w-1 rounded-full bg-french-vanilla-300" />
        </div>
        <div className="flex flex-row items-baseline gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-info-400">
            <Icon
              icon="ic:baseline-apartment"
              className="h-3 w-3 text-info-400"
            />
          </div>
          <span className="w-9 text-title-xs text-french-vanilla-500">To</span>
          <span className="text-body-m">Cafe Amazon for Chance</span>
        </div>
      </div>
      <div>
        <Icon
          icon="ic:baseline-chevron-right"
          className="h-6 w-6 text-french-vanilla-300"
        />
      </div>
    </div>
  )
}
