import { useMemo, type FC } from 'react'

import { filterFns, type ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

import { BaseTable } from '~/components/BaseTable'
import { Tag } from '~/components/Tag'
import type { Color } from '~/const/Color'
import { Concern } from '~/const/Concern'
import { Facilities } from '~/const/Facility'
import type {
  Concern_Types,
  Facility_Types,
  GetFacilitiesByPlaceIdQuery,
} from '~/generated-types'

interface FacilitiesTableProps {
  data: GetFacilitiesByPlaceIdQuery['getFacilitiesByPlaceId'][0][]
}

interface Item {
  id: string
  type: string
  concern?: string
  isWarning?: boolean
}

export const FacilitiesTable: FC<FacilitiesTableProps> = ({ data }) => {
  const { t } = useTranslation('facility')
  const cols = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: 'updatedAt',
        enableHiding: true,
        enableColumnFilter: false,
      },
      {
        id: 'formattedType',
        accessorFn: (row) => t(row.type),
        enableHiding: true,
        enableColumnFilter: false,
      },
      {
        header: t('type') as string,
        cell: (row) => {
          const item = row.getValue() as Facility_Types
          return (
            <>
              {Object.keys(Facilities).includes(item) && (
                <Tag
                  label={t(item)}
                  icon={Facilities[item].icon}
                  state="available"
                  className="cursor-pointer border-solid"
                />
              )}
            </>
          )
        },
        meta: {
          align: 'center',
          width: 180,
        },
        accessorKey: 'type',
        enableColumnFilter: false,
        enableSorting: true,
        filterFn: filterFns.arrIncludesSome,
      },
      {
        id: 'formattedConcern',
        accessorFn: (row) => t(row.concern as Concern_Types),
        enableHiding: true,
        enableColumnFilter: false,
      },
      {
        header: t('concern') as string,
        cell: (row) => (
          <Tag
            label={t(row.getValue() as Concern_Types)}
            color={Concern[row.getValue() as Concern_Types].color as Color}
            className="cursor-pointer border-solid"
          />
        ),
        meta: {
          align: 'center',
          width: 180,
        },
        accessorFn: (row) => row.concern ?? 'NONE',
        enableColumnFilter: false,
        enableSorting: true,
        filterFn: filterFns.arrIncludesSome,
      },
      {
        header: t('warning') as string,
        cell: (row) => {
          const isFlagged = row.getValue() === 'true'
          return (
            <Tag
              label=""
              icon={isFlagged ? 'ic:round-warning' : 'ic:round-warning-amber'}
              iconPosition="right"
              iconColor={
                isFlagged ? 'text-warning-400' : 'text-french-vanilla-300'
              }
              className="cursor-pointer border-none bg-transparent"
              state="available"
              color="magenta"
            />
          )
        },
        meta: {
          align: 'center',
          width: 90,
        },
        accessorFn: (row) =>
          row.isWarning ? row.isWarning.toString() : 'false',
        enableColumnFilter: false,
      },
    ],
    [],
  )

  const initialState = {
    sorting: [
      {
        id: 'updatedAt',
        desc: true,
      },
    ],
    columnVisibility: {
      updatedAt: false,
      formattedType: false,
      formattedConcern: false,
    },
  }

  return (
    <BaseTable
      data={data}
      columns={cols}
      addPrimaryButton={false}
      removeButton={false}
      exportButton={false}
      query={true}
      initialState={initialState}
    />
  )
}
