import { AccessibilityLevels } from '~/const/AccessibilityLevels'
import { Concern_Types } from '~/generated-types'

export function indentifySlopeType(rise: number, length: number) {
  if (rise === 0 || length === 0) {
    return Concern_Types.None
  }

  const slopeRatio = rise / length

  if (slopeRatio < 1 / 20) {
    return Concern_Types.Accessible
  }

  if (slopeRatio <= 1 / 10) {
    return Concern_Types.NeedAssistance
  }

  return Concern_Types.Hazard
}

export function isNumeric(num: any) {
  return (
    (typeof num === 'number' ||
      (typeof num === 'string' && num.trim() !== '')) &&
    !isNaN(num as number)
  )
}

export function timeout(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export function ratingText(ratingValue: number) {
  return AccessibilityLevels.find((level) => {
    return ratingValue >= level.min && ratingValue <= level.max
  })?.label
}

export function convertToCSV(data: any[], columns: string[]) {
  const rows = data.map((row) =>
    columns
      .map((column) => {
        const fieldValue = column
          .split('.')
          .reduce((acc, cur) => acc?.[cur], row)
        const escapedValue =
          fieldValue != null ? String(fieldValue).replace(/"/g, '""') : ''
        return `"${escapedValue}"`
      })
      .join(','),
  )
  return [columns.join(','), ...rows].join('\n')
}
