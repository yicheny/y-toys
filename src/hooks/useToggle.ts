import { useCallback, useState } from 'react'

export function useToggle() {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [])
  const close = useCallback(() => setShow(false), [])
  const toggle = useCallback(() => setShow((x) => !x), [])

  return { show, toggle, open, close }
}
