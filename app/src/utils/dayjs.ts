import dayjs from 'dayjs'

import 'dayjs/locale/th'
import 'dayjs/locale/en'
import { CalendarIdentifier, getCalendars } from 'expo-localization'

import buddhistEra from 'dayjs/plugin/buddhistEra'
import duration from 'dayjs/plugin/duration'

dayjs.extend(buddhistEra)
dayjs.extend(duration)

export function setLocale(locale: string) {
  dayjs.locale(locale)
}

export function getLocale() {
  return dayjs.locale()
}

export enum FormatEnum {
  DATE = 'DD MMM YYYY',
  TIME = 'HH:mm',
}

export function format(
  date: string,
  formatOptions: FormatEnum[] = [FormatEnum.DATE],
) {
  const [calendarPreferences] = getCalendars()

  let yearFormat = 'YYYY'

  if (calendarPreferences?.calendar === CalendarIdentifier.BUDDHIST) {
    yearFormat = 'BBBB'
  }

  let format = formatOptions.join(' ')
  format = format.replace('YYYY', yearFormat)

  return dayjs(date).format(format)
}
