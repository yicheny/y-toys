import { Nullable } from '../types'
import { useCallback, useState } from 'react'

type DisplayRecord = {
  type: string
  [key: string]: any
}

export function useDisplay(defaultRecord: Nullable<DisplayRecord> = null) {
  const [record, setRecord] = useState<Nullable<DisplayRecord>>(defaultRecord)

  const close = useCallback(() => setRecord(null), [])

  const checkStatus = useCallback(
    (type: string) => {
      return type === record?.type
    },
    [record]
  )

  return { record, setRecord, close, checkStatus }
}
