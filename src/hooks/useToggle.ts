import { useCallback, useState } from 'react'

export function useToggle(initialShow:boolean = false) {
  const [show, setShow] = useState<boolean>(initialShow)

  const open = useCallback(() => setShow(true), [])
  const close = useCallback(() => setShow(false), [])
  const toggle = useCallback(() => setShow((x) => !x), [])

  return { show, toggle, open, close }
}
