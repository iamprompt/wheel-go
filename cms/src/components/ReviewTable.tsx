import { useMemo } from 'react'

import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { BaseTable } from '~/components/BaseTable'
import { IndeterminateCheckbox } from '~/components/IndeterminateCheckbox'
import { Tag } from '~/components/Tag'
import { useGetReviewsQuery, type Review } from '~/generated-types'

export function ReviewTable() {
  const { error: _error, loading: _loading, data } = useGetReviewsQuery()

  const { t: tTable, i18n } = useTranslation('table')
  const isEN = i18n.language === 'en'
  const isSpaced = isEN ? ' ' : ''

  const cols = useMemo<ColumnDef<Review>[]>(
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
        accessorFn: ({ place }) => place?.internalCode ?? '',
        enableHiding: true,
        enableColumnFilter: false,
      },
      {
        header: `${tTable('place_name')}`,
        cell: (row) => row.renderValue(),
        meta: {
          align: 'left',
          width: 300,
        },
        accessorFn: ({ place }) => (isEN ? place?.name?.en : place?.name?.th),
        enableColumnFilter: false,
      },
      {
        header: `${tTable('user')}`,
        meta: {
          align: 'left',
          width: 150,
        },
        accessorFn: ({ user }) => `${user?.firstname} ${user?.lastname}`,
        enableColumnFilter: false,
      },
      {
        header: `${tTable('review')}`,
        cell: (row) => row.renderValue(),
        meta: {
          align: 'left',
          width: 350,
        },
        accessorKey: 'comment',
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
          width: 200,
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
        header: `${tTable('rating')}`,
        cell: (row) => (
          <Tag
            label={row.getValue() as string}
            icon="ic:round-star"
            iconPosition="right"
            iconColor="text-warning-400"
            className="cursor-pointer border-none bg-transparent"
            state="available"
            color="magenta"
          />
        ),
        meta: {
          align: 'center',
          width: 240,
        },
        accessorKey: 'rating.overall',
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        header: `${tTable('flag')}`,
        cell: (row) => {
          const isFlagged = row.getValue() === true
          return (
            <Tag
              label=""
              icon={isFlagged ? 'ic:round-flag' : 'ic:round-outlined-flag'}
              iconPosition="right"
              iconColor={
                isFlagged ? 'text-error-400' : 'text-french-vanilla-300'
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
        accessorFn: (row) => row.official?.isFlagged ?? false,
        enableColumnFilter: false,
      },
    ],
    [tTable],
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
    },
  }

  return (
    <>
      {data && (
        <BaseTable
          title={`${tTable('review')}`}
          description={`${tTable('review')}${isSpaced}${tTable('description')}`}
          data={data?.getReviews}
          columns={cols}
          initialState={initialState}
          addPrimaryButton={false}
        />
      )}
    </>
  )
}
