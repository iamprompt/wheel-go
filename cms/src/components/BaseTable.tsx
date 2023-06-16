import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'
import { Modal, MultiSelect, NumberInput, rem, Select } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  rankings,
  rankItem,
  type RankingInfo,
} from '@tanstack/match-sorter-utils'
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  type Row,
  type Table,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { convertToCSV } from '~/utils/calculate'
import { cn } from '~/utils/classname'
import { transitionProps } from '~/utils/transitionProps'
import { Button } from '~/components/Button'
import { StatusTag } from '~/components/StatusTag'
import { Tag } from '~/components/Tag'
import { Categories } from '~/const/Category'
import type { Color } from '~/const/Color'
import {
  announcementColumns,
  placeColumns,
  reviewColumns,
} from '~/const/ColumnNames'
import {
  useDeleteAnnouncementMutation,
  useDeletePlaceMutation,
  useDeleteReviewMutation,
  useGetAnnouncementsAllQuery,
  useGetPlacesAllQuery,
  useGetReviewsAllQuery,
  type Place_Types,
  type Status,
} from '~/generated-types'

function fuzzy<TData extends Record<string, any>>(
  row: Row<TData>,
  columnId: string,
  filterValue: string | number,
  addMeta: (item: RankingInfo) => void,
) {
  const itemRank = rankItem(row.getValue(columnId), filterValue as string, {
    threshold: rankings.MATCHES,
  })
  addMeta(itemRank)
  return itemRank.passed
}
fuzzy.autoRemove = (val: any) => !val

export const filterFns = {
  fuzzy,
}

interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T | any>[]
  initialState?: object
  showNavigation?: boolean
  showGlobalFilter?: boolean
  filterFn?: FilterFn<T>
  title?: string
  description?: string
  addPrimaryButton?: boolean
  removeButton?: boolean
  exportButton?: boolean
  query?: boolean
}

export function BaseTable<T extends object>({
  data,
  columns,
  initialState,
  showNavigation = true,
  showGlobalFilter = true,
  filterFn = filterFns.fuzzy,
  title = '',
  description = '',
  addPrimaryButton = true,
  removeButton = true,
  exportButton = true,
  query = false,
}: ReactTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const [exportOpened, { open: exportOpen, close: exportClose }] =
    useDisclosure(false)
  const [removeOpened, { open: removeOpen, close: removeClose }] =
    useDisclosure(false)
  const [removed, setRemoved] = useState(false)

  const { t, i18n } = useTranslation('table')
  const { t: tCat } = useTranslation('category')
  const { t: tDoc } = useTranslation('document', { keyPrefix: 'status' })
  const isEN = i18n.language === 'en'
  const isSpaced = isEN ? ' ' : ''

  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    initialState,
    state: {
      globalFilter,
      columnFilters,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: filterFn,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    debugTable: false,
  })

  const [DeletePlace, { error: deletePlaceError }] = useDeletePlaceMutation()
  const [DeleteAnnouncement, { error: deleteAnnouncementError }] =
    useDeleteAnnouncementMutation()
  const [DeleteReview, { error: deleteReviewError }] = useDeleteReviewMutation()

  const removePlace = (id: string) => {
    DeletePlace({
      variables: {
        id,
      },
    })

    if (deletePlaceError) {
      console.log(deletePlaceError)
    }
  }
  const removeAnnouncement = (id: string) => {
    DeleteAnnouncement({
      variables: {
        id,
      },
    })

    if (deleteAnnouncementError) {
      console.log(deleteAnnouncementError)
    }
  }

  const removeReview = (id: string) => {
    DeleteReview({
      variables: {
        id,
      },
    })

    if (deleteReviewError) {
      console.log(deleteReviewError)
    }
  }

  async function handleRemove() {
    const selectedIds = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original.id)

    if (router.asPath === '/place') {
      selectedIds.forEach((id) => {
        removePlace(id)
      })
    }

    if (router.asPath === '/announcement') {
      selectedIds.forEach((id) => {
        removeAnnouncement(id)
      })
    }

    if (router.asPath === '/review') {
      selectedIds.forEach((id) => {
        removeReview(id)
      })
    }
  }

  const handleClose = async () => {
    removeClose()
    router.reload()
  }

  // function convertToCSV(data: any[], columns: string[]) {
  //   const rows = data.map((row) =>
  //     columns
  //       .map((column) => {
  //         const fieldValue = column
  //           .split('.')
  //           .reduce((acc, cur) => acc?.[cur], row)
  //         const escapedValue =
  //           fieldValue != null ? String(fieldValue).replace(/"/g, '""') : ''
  //         return `"${escapedValue}"`
  //       })
  //       .join(',')
  //   )
  //   return [columns.join(','), ...rows].join('\n')
  // }

  const { data: placesData } = useGetPlacesAllQuery()
  const { data: announcementsData } = useGetAnnouncementsAllQuery()
  const { data: reviewsData } = useGetReviewsAllQuery()

  const handleExport = async () => {
    let csv = ''
    let filename = ''
    if (router.asPath === '/place') {
      csv = convertToCSV(placesData?.getPlaces ?? [], placeColumns)
      filename = 'places.csv'
    }

    if (router.asPath === '/announcement') {
      csv = convertToCSV(
        announcementsData?.getAnnouncements ?? [],
        announcementColumns,
      )
      filename = 'announcements.csv'
    }

    if (router.asPath === '/review') {
      csv = convertToCSV(reviewsData?.getReviews ?? [], reviewColumns)
      filename = 'reviews.csv'
    }
    const url = window.URL.createObjectURL(new Blob([csv]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    exportOpen()
  }

  return (
    <div className="w-full space-y-6">
      <Modal
        opened={removeOpened}
        onClose={removeClose}
        centered
        size="xl"
        withCloseButton={false}
      >
        <div className="flex flex-col gap-6">
          {removed && (
            <div className="mt-2 flex items-center justify-center gap-2 text-title-l text-error-500">
              <Icon icon="mdi:trash" className="h-6 w-6 text-error-500" />
              {t('remove_success')} (
              {table.getSelectedRowModel().flatRows.length})
            </div>
          )}
          {!removed && (
            <div>
              <div className="text-title-l">
                {t('remove_prompt')} (
                {table.getSelectedRowModel().flatRows.length})
              </div>
              {table.getSelectedRowModel().flatRows.length > 0 && (
                <div className="mt-4 flex flex-col gap-4">
                  {table.getSelectedRowModel().flatRows.map((row) => (
                    <div
                      key={row.id}
                      className="flex flex-col flex-wrap rounded-md border border-solid border-error-500 bg-error-100 p-2"
                    >
                      {router.asPath === '/place' && (
                        <table className="w-full table-fixed">
                          <thead>
                            <tr>
                              <th>{t('place_name')}</th>
                              <th>{t('latest_updated')}</th>
                              <th>{t('category')}</th>
                              <th>{t('status')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {isEN
                                  ? row.original.name.en
                                  : row.original.name.th}
                              </td>
                              <td className="overflow-hidden text-ellipsis whitespace-nowrap text-center">
                                {dayjs(row.original.updatedAt).format(
                                  'DD/MM/YY',
                                )}{' '}
                                {t('at')}{' '}
                                {dayjs(row.original.updatedAt).format('HH:mm')}
                              </td>
                              <td className="flex justify-center">
                                <Tag
                                  label={tCat(row.original.type)}
                                  icon={
                                    Categories[row.original.type as Place_Types]
                                      .icon
                                  }
                                  color={
                                    Categories[row.original.type as Place_Types]
                                      .color as Color
                                  }
                                  state="available"
                                  className="border-solid"
                                />
                              </td>
                              <td>
                                <StatusTag
                                  label={tDoc(row.original.status as string)}
                                  state={row.original.status as Status}
                                  className="w-full"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                      {router.asPath === '/announcement' && (
                        <table className="w-full table-fixed">
                          <thead>
                            <tr>
                              <th>{t('announcement_name')}</th>
                              <th>{t('announcement_details')}</th>
                              <th>{t('latest_updated')}</th>
                              <th>{t('status')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {isEN
                                  ? row.original.title.en
                                  : row.original.title.th}
                              </td>
                              <td className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {isEN
                                  ? row.original.content.en
                                  : row.original.content.th}
                              </td>
                              <td className="overflow-hidden text-ellipsis whitespace-nowrap text-center">
                                {dayjs(row.original.updatedAt).format(
                                  'DD/MM/YY',
                                )}{' '}
                                {t('at')}{' '}
                                {dayjs(row.original.updatedAt).format('HH:mm')}
                              </td>
                              <td>
                                <StatusTag
                                  label={tDoc(row.original.status as string)}
                                  state={row.original.status as Status}
                                  className="w-full"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                      {router.asPath === '/review' && (
                        <table className="w-full table-fixed">
                          <thead>
                            <tr>
                              <th>{t('place_name')}</th>
                              <th>{t('user')}</th>
                              <th>{t('review')}</th>
                              <th>{t('rating')}</th>
                              <th>{t('flag')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {isEN
                                  ? row.original.place.name.en
                                  : row.original.place.name.th}
                              </td>
                              <td className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {row.original.user.firstname}{' '}
                                {row.original.user.lastname}
                              </td>
                              <td className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {row.original.comment}
                              </td>
                              <td>
                                <Tag
                                  label={row.original.rating.overall}
                                  icon="ic:round-star"
                                  iconPosition="right"
                                  iconColor="text-warning-400"
                                  className="w-full cursor-pointer border-none bg-transparent"
                                  state="available"
                                  color="magenta"
                                />
                              </td>
                              <td>
                                <Tag
                                  label=""
                                  icon={
                                    row.original.official?.isFlagged
                                      ? 'ic:round-flag'
                                      : 'ic:round-outlined-flag'
                                  }
                                  iconPosition="right"
                                  iconColor={
                                    row.original.official?.isFlagged
                                      ? 'text-error-400'
                                      : 'text-french-vanilla-300'
                                  }
                                  className="w-full cursor-pointer border-none bg-transparent"
                                  state="available"
                                  color="magenta"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {removed && (
            <Button
              appearance="primary"
              label={t('close') as string}
              className="w-full cursor-pointer"
              onClick={handleClose}
            />
          )}
          {!removed && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                appearance="danger"
                label={t('remove') as string}
                className="w-full cursor-pointer"
                icon="mdi:trash"
                onClick={() => {
                  setRemoved(true)
                  handleRemove()
                }}
              />
              <Button
                appearance="primary"
                label={t('discard') as string}
                className="w-full cursor-pointer"
                onClick={removeClose}
              />
            </div>
          )}
        </div>
      </Modal>
      <Modal
        opened={exportOpened}
        onClose={exportClose}
        withCloseButton={false}
        centered
      >
        <div className="mb-4 mt-2 flex items-center justify-center gap-2 text-title-l text-success-400">
          <Icon icon="ep:success-filled" className="h-6 w-6 text-success-400" />
          {t('export_success')}
        </div>
        <Button
          appearance="secondary"
          label={t('close') as string}
          className="w-full cursor-pointer"
          onClick={exportClose}
        />
      </Modal>
      <div className="mb-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {title ? (
            <div className="flex flex-col">
              <div className="text-title-xl text-magenta-600">
                {title} ({data.length})
              </div>
              <div className="text-body-l text-french-vanilla-500">
                {description}
              </div>
            </div>
          ) : null}
          {addPrimaryButton && (
            <div className="ml-4 flex items-end justify-end">
              <Link href={`${router.asPath}/add`}>
                <Button
                  appearance="primary"
                  label={`${t('add')}${isSpaced}${t(title.toLowerCase())}`}
                  className="h-11 cursor-pointer px-8"
                  icon="ic:round-add"
                />
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-6 gap-6">
          <div
            className={
              removeButton && exportButton ? 'col-span-4' : 'col-span-6'
            }
          >
            {showGlobalFilter ? (
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={(value) => setGlobalFilter(String(value))}
                className="w-full rounded-xl border border-solid border-french-vanilla-300 py-3 pl-9 font-sans text-body-l text-magenta-600 placeholder:text-french-vanilla-400 focus:outline-magenta-500"
                placeholder={`${t('search')}...`}
                icon="ic:baseline-search"
                iconClass="text-magenta-600 w-6 h-6"
              />
            ) : null}
          </div>
          {removeButton && (
            <Button
              appearance="danger"
              label={t('remove') as string}
              className="w-full cursor-pointer"
              icon="mdi:trash"
              onClick={removeOpen}
            />
          )}
          {exportButton && (
            <Button
              appearance="secondary"
              label={t('export_csv') as string}
              className="w-full cursor-pointer"
              icon="ic:baseline-download"
              onClick={handleExport}
            />
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full table-fixed border-spacing-0 rounded-3xl border border-solid border-french-vanilla-300 bg-french-vanilla-100">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-title-s text-magenta-600"
                    align={(header.column.columnDef.meta as any)?.align}
                    style={{
                      borderBottom: '1px solid #D4D4D4',
                      width: (header.column.columnDef.meta as any)?.width,
                      visibility:
                        (header.column.columnDef.meta as any)?.visibility ??
                        'visible',
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none inline-flex mb-1'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {/* {`${header.column.getCanGlobalFilter()}`} */}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <Icon
                                icon={'mdi:arrow-up-thin'}
                                className="h-6 w-6 text-magenta-400"
                              />
                            ),
                            desc: (
                              <Icon
                                icon={'mdi:arrow-down-thin'}
                                className="h-6 w-6 text-magenta-400"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ??
                            (header.column.getCanSort() ? (
                              <Icon
                                icon={'ic:outline-swap-vert'}
                                className="h-6 w-6 text-french-vanilla-400"
                              />
                            ) : null)}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  'cursor-pointer hover:bg-soap-100',
                  router.query.fid === row.original?.id ? 'bg-soap-100' : '',
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="overflow-hidden text-ellipsis whitespace-nowrap px-6 py-4 text-body-l text-magenta-600"
                    key={cell.id}
                    align={(cell.column.columnDef.meta as any)?.align}
                    onClick={() =>
                      cell.column.columnDef.id
                        ? null
                        : query
                        ? router.query.fid === row.original.id
                          ? router.replace(
                              {
                                query: {
                                  id: router.asPath.split('/')[2],
                                },
                              },
                              undefined,
                              { scroll: false },
                            )
                          : router.push(
                              {
                                query: {
                                  id: router.asPath.split('/')[2],
                                  fid: row.original.id,
                                },
                              },
                              undefined,
                              { scroll: false },
                            )
                        : router.push({
                            pathname: `${router.asPath}/${row.original.id}/edit`,
                          })
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showNavigation ? (
        <div className="grid grid-cols-3">
          <div className="col-span-2 flex items-center justify-end gap-2">
            <div className="text-body-l text-french-vanilla-500">
              {t('first')}
            </div>
            <Button
              appearance="none"
              cursorPointer
              icon="ic:round-keyboard-double-arrow-left"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            />
            <Button
              appearance="none"
              cursorPointer
              icon="ic:round-chevron-left"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
            <NumberInput
              styles={{ input: { width: rem(54), textAlign: 'center' } }}
              min={1}
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(value) => {
                const page = value ? Number(value) - 1 : 0
                table.setPageIndex(page)
              }}
              value={table.getState().pagination.pageIndex + 1}
              hideControls
            />
            <div className="text-body-l text-french-vanilla-500">
              {t('out_of')} {table.getPageCount()}
            </div>
            <Button
              appearance="none"
              cursorPointer
              icon="ic:round-chevron-right"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
            <Button
              appearance="none"
              cursorPointer
              icon="ic:round-keyboard-double-arrow-right"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            />
            <div className="text-body-l text-french-vanilla-500">
              {t('last')}
            </div>
          </div>
          <div className="flex justify-end">
            <Select
              maw="115px"
              value={table.getState().pagination.pageSize.toString()}
              onChange={(value) => {
                table.setPageSize(Number(value))
              }}
              data={[
                { value: '10', label: `${t('show')} 10` },
                { value: '20', label: `${t('show')} 20` },
                { value: '30', label: `${t('show')} 30` },
                { value: '40', label: `${t('show')} 40` },
                { value: '50', label: `${t('show')} 50` },
              ]}
              transitionProps={transitionProps}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column, firstValue],
  )

  const { t } = useTranslation('table')
  const { t: tCat } = useTranslation('category')
  const { t: tDoc } = useTranslation('document', { keyPrefix: 'status' })

  const filterPlaces = sortedUniqueValues.includes('BUILDING')
  const filterStatus = sortedUniqueValues.includes('PUBLISHED')

  const options = filterPlaces
    ? sortedUniqueValues.map((item) => ({ value: item, label: tCat(item) }))
    : filterStatus
    ? sortedUniqueValues.map((item) => ({ value: item, label: tDoc(item) }))
    : sortedUniqueValues

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex justify-center space-x-2">
        <NumberInput
          maw="93px"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`${t('min')} ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
        />
        <NumberInput
          maw="93px"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`${t('max')} ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <MultiSelect
      value={(columnFilterValue ?? []) as string[]}
      onChange={(value) => {
        column.setFilterValue(value)
      }}
      // data={sortedUniqueValues}
      data={options}
      searchable
      clearable
      nothingFound="No options"
      placeholder={`${t('search')}... (${
        column.getFacetedUniqueValues().size
      })`}
      transitionProps={transitionProps}
    />
  )
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  icon,
  iconClass,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
  icon?: string
  iconClass?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  return (
    <div className="relative flex items-center">
      {icon && (
        <div className="absolute left-0 flex items-center pl-2 placeholder:text-french-vanilla-400">
          <Icon icon={icon} className={iconClass} />{' '}
        </div>
      )}

      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== '' && (
        <div className="absolute right-0">
          <button
            onClick={() => setValue('')}
            className="flex cursor-pointer border-none bg-transparent"
          >
            <Icon icon="ic:round-close" className={iconClass} />
          </button>
        </div>
      )}
    </div>
  )
}
