import merge from 'lodash-es/merge'

import { store } from '@/store/reducer.js'

import DateFormatter from './php-date-format.js'

type DisplatyType = 'display' | 'extendedDisplay'

const fmt = new DateFormatter()

const formatCreator =
  (displayType: DisplatyType, handler: string, useOffset = true) =>
  (timestamp: string | number, isDateStr = false) => {
    const { timeFormat } = store.getState().storeInfo
    const dateFormat = merge(
      {
        display: 'j M Y',
        export: 'M j Y',
        extendedDisplay: 'M j Y @ g:i A',
        offset: 0,
      },
      timeFormat
    )
    const display = dateFormat[displayType]

    if (!timestamp) return ''

    const dateTime = isDateStr
      ? timestamp
      : parseInt(String(timestamp), 10) * 1000
    const localDate = new Date(dateTime)
    const localTime = localDate.getTime()
    const offset = useOffset
      ? localDate.getTimezoneOffset() * 60000 + dateFormat.offset * 1000
      : 0
    const utcTime = localTime + offset

    const dateObject = new Date(utcTime)
    switch (handler) {
      case 'formatDate':
        return fmt.formatDate(dateObject, display) || ''
      case 'parseDate':
        return fmt.parseDate(dateObject, display) || ''
      default:
        return null
    }
  }

const displayFormat = formatCreator('display', 'formatDate')
const displayExtendedFormat = formatCreator('extendedDisplay', 'formatDate')

const getUTCTimestamp = (
  timestamp: string | number,
  adjustment?: boolean,
  isDateStr = false
) => {
  const { timeFormat } = store.getState().storeInfo
  const dateFormat = merge(
    {
      display: 'j M Y',
      export: 'M j Y',
      extendedDisplay: 'M j Y @ g:i A',
      offset: 0,
    },
    timeFormat
  )

  if (!timestamp) return ''
  const dateTime = isDateStr
    ? timestamp
    : parseInt(String(timestamp), 10) * 1000
  const localDate = new Date(dateTime)
  const localTime = localDate.getTime()
  const offset =
    localDate.getTimezoneOffset() * 60000 + dateFormat.offset * 1000

  const adjustmentTime = adjustment ? (24 * 60 * 60 - 1) * 1000 : 0

  const utcTime = localTime + offset + adjustmentTime

  return utcTime / 1000
}

export { displayExtendedFormat, displayFormat, getUTCTimestamp }
