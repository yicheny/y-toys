import { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { Undefinable } from '../types'

export type OnSelect<T> = (record?: T) => void
export type OnChange<T> = (record?: T) => void
export type IsSelect<T> = (record: T) => boolean

export interface IUseSelect<T> {
  //推荐优先使用defaultValue
  defaultValue?: T
  value?: T
  //手动触发调用
  onSelect?: OnSelect<T>
  //无论通过什么方式触发，选择值改变就调用
  onChange?: OnChange<T>
}

export type SelectActions<T> = {
  isSelect: (v: T) => boolean
  handleSelect: (v: T) => void
}

export function useSelect<T>(props: IUseSelect<T>) {
  const { defaultValue, onSelect, onChange, value: _value } = props
  const [value, setValue] = useState<Undefinable<T>>(defaultValue)

  useEffect(() => {
    if (_.isUndefined(defaultValue)) setValue(_value)
    if (!(_.isUndefined(defaultValue) || _.isUndefined(_value))) {
      throw new Error('useSelect禁止同时使用value和defaultValue!')
    }
  }, [defaultValue, _value])

  useEffect(() => {
    if (onChange) onChange(value)
  }, [onChange, value])

  const handleSelect = useCallback(
    (info: T) => {
      setValue(info)
      onSelect && onSelect(info)
    },
    [onSelect]
  )

  const isSelect = useCallback(
    (info: T) => {
      return info === value
    },
    [value]
  )

  const getSelectValue = useCallback(() => value, [value])

  return { handleSelect, isSelect, getSelectValue }
}
