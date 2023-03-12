import { Icon } from '@iconify/react'
import type { FC } from 'react'

interface RouteItemProps {
  from: {
    type: string
    name: string
  }
  to: {
    type: string
    name: string
  }
}

export const RouteItem: FC<RouteItemProps> = ({
  from: { type: fromType, name: fromName },
  to: { type: toType, name: toName },
}) => {
  return (
    <div className="flex flex-row items-center justify-between py-6 px-4">
      <div className="space-y-2">
        <div className="flex flex-row items-center gap-3">
          {/* <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-info-400">
            <Icon
              icon="ic:baseline-apartment"
              className="h-3 w-3 text-info-400"
            />
          </div> */}
          <img
            src={`/images/places/icon/${fromType}.png`}
            alt={fromType}
            className="h-6 w-6"
          />
          <span className="w-9 text-title-xs text-french-vanilla-500">
            From
          </span>
          <span className="text-body-m line-clamp-1">{fromName}</span>
        </div>
        <div className="flex w-6 items-center justify-center">
          <div className="h-4 w-1 rounded-full bg-french-vanilla-300" />
        </div>
        <div className="flex flex-row items-center gap-3">
          {/* <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-info-400">
            <Icon
              icon="ic:baseline-apartment"
              className="h-3 w-3 text-info-400"
            />
          </div> */}
          <img
            src={`/images/places/icon/${toType}.png`}
            alt={toType}
            className="h-6 w-6"
          />
          <span className="w-9 text-title-xs text-french-vanilla-500">To</span>
          <span className="text-body-m line-clamp-1">{toName}</span>
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
