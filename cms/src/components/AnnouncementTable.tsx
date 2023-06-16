import { useMemo } from 'react'

import { filterFns, type ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { BaseTable } from '~/components/BaseTable'
import { IndeterminateCheckbox } from '~/components/IndeterminateCheckbox'
import { StatusTag } from '~/components/StatusTag'
import {
  useGetAnnouncementsQuery,
  type Announcement,
  type Status,
} from '~/generated-types'

export function AnnouncementTable() {
  const { error: _error, loading: _loading, data } = useGetAnnouncementsQuery()

  const { t: tDoc } = useTranslation('document', { keyPrefix: 'status' })
  const { t: tTable, i18n } = useTranslation('table')
  const isEN = i18n.language === 'en'
  const isSpaced = isEN ? ' ' : ''

  const cols = useMemo<ColumnDef<Announcement>[]>(
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
        header: `${tTable('announcement_name')}`,
        meta: {
          align: 'left',
          width: 300,
        },
        accessorFn: (row) => (isEN ? row.title?.en : row.title?.th),
        enableColumnFilter: false,
      },
      {
        header: `${tTable('announcement_details')}`,
        meta: {
          align: 'left',
          width: 300,
        },
        accessorFn: (row) => (isEN ? row.content?.en : row.content?.th),
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
          width: 220,
        },
        accessorKey: 'status',
        enableColumnFilter: true,
        enableSorting: true,
        filterFn: filterFns.arrIncludesSome,
      },
    ],
    [isEN, tDoc, tTable],
  )
  const initialState = {
    sorting: [
      {
        id: 'updatedAt',
        desc: true,
      },
    ],
  }

  return (
    <>
      {data && (
        <BaseTable
          title={`${tTable('announcement')}`}
          description={`${tTable('announcement')}${isSpaced}${tTable(
            'description',
          )}`}
          data={data?.getAnnouncements}
          columns={cols}
          initialState={initialState}
        />
      )}
    </>
  )
}
