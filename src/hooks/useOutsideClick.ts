import React, { useEffect } from 'react'
import _ from 'lodash'
import { useDomRef } from './useDomRef'

export function useOutsideClick<T extends HTMLElement>(handle: React.MouseEventHandler<HTMLElement>) {
    const { ref, setRef } = useDomRef<T>()

    useEffect(() => {
        const listener = function (event: Event) {
            if (!ref.current || ref.current.contains(event.target as Node)) return
            if (_.isFunction(handle)) handle(event)
        }
        document.addEventListener('click', listener)

        return () => {
            document.removeEventListener('click', listener)
        }
    }, [handle, ref])

    return { setOutsideRef: setRef }
}
