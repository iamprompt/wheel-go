import { useMemo } from 'react'

import { filterFns, type ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { BaseTable } from '~/components/BaseTable'
import { IndeterminateCheckbox } from '~/components/IndeterminateCheckbox'
import { StatusTag } from '~/components/StatusTag'
import { Tag } from '~/components/Tag'
import { Categories } from '~/const/Category'
import type { Color } from '~/const/Color'
import {
  useGetPlacesQuery,
  type Place,
  type Place_Types,
  type Status,
} from '~/generated-types'

export function PlaceTable() {
  const { error: _error, loading: _loading, data } = useGetPlacesQuery()

  const places = data?.getPlaces.map((item) => {
    if (item.name === null) {
      return {
        ...item,
        name: {
          en: '',
          th: '',
        },
      }
    }
    if (item.internalCode === null) {
      return {
        ...item,
        internalCode: '',
      }
    }
    return item
  })

  const { t: tCat } = useTranslation('category')
  const { t: tDoc } = useTranslation('document', { keyPrefix: 'status' })
  const { t: tTable, i18n } = useTranslation('table')
  const isEN = i18n.language === 'en'
  const isSpaced = isEN ? ' ' : ''

  const cols = useMemo<ColumnDef<Place>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
        meta: {
          align: 'center',
          width: 70,
        },
      },
      {
        accessorKey: 'internalCode',
        enableHiding: true,
        enableColumnFilter: false,
      },
      {
        header: `${tTable('place_name')}`,
        meta: {
          align: 'left',
          width: 420,
        },
        accessorFn: (row) => (isEN ? row.name?.en : row.name?.th),
        enableColumnFilter: false,
      },
      {
        header: `${tTable('latest_updated')}`,
        cell: (row) => {
          const date = dayjs(row.getValue() as string)
          return `${date.format('DD/MM/YY')} ${tTable('at')} ${date.format(
            'HH:mm',
          )}`
        },
        meta: {
          align: 'center',
          width: 220,
        },
        accessorKey: 'updatedAt',
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        id: 'formattedUpdatedAt',
        accessorFn: (row) => {
          const date = dayjs(row.updatedAt)
          return `${date.format('DD/MM/YY')} ${tTable('at')} ${date.format(
            'HH:mm',
          )}`
        },
        enableHiding: true,
        enableColumnFilter: false,
      },
      {
        header: `${tTable('category')}`,
        cell: (row) => {
          const item = row.getValue() as Place_Types
          return (
            <>
              {Object.keys(Categories).includes(item) && (
                <Tag
                  label={tCat(item)}
                  icon={Categories[item].icon}
                  color={Categories[item].color as Color}
                  state="available"
                  className="cursor-pointer border-solid"
                />
              )}
            </>
          )
        },
        meta: {
          align: 'center',
          width: 300,
        },
        accessorKey: 'type',
        enableColumnFilter: true,
        enableSorting: true,
        filterFn: filterFns.arrIncludesSome,
      },
      {
        id: 'formattedCategory',
        accessorFn: (row) => tCat(row.type as Place_Types),
        enableHiding: true,
        enableColumnFilter: false,
      },
      {
        header: `${tTable('status')}`,
        cell: (row) => (
          <StatusTag
            label={tDoc(row.getValue() as string)}
            state={row.getValue() as Status}
            className="cursor-pointer"
          />
        ),
        meta: {
          align: 'center',
          width: 300,
        },
        accessorKey: 'status',
        enableColumnFilter: true,
        enableSorting: true,
        filterFn: filterFns.arrIncludesSome,
      },
      {
        id: 'formattedStatus',
        accessorFn: (row) => tDoc((row.status ?? 'DRAFT') as Status),
        enableHiding: true,
        enableColumnFilter: false,
      },
    ],
    [isEN, tCat, tDoc, tTable],
  )
  const initialState = {
    sorting: [
      {
        id: 'updatedAt',
        desc: true,
      },
    ],
    columnVisibility: {
      internalCode: false,
      formattedUpdatedAt: false,
      formattedCategory: false,
      formattedStatus: false,
    },
  }

  return (
    <>
      {data && (
        <BaseTable
          title={`${tTable('place')}`}
          description={`${tTable('place')}${isSpaced}${tTable('description')}`}
          data={places || []}
          columns={cols}
          initialState={initialState}
        />
      )}
    </>
  )
}
