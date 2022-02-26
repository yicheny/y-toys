import { useReducer } from 'react'

//注：不要滥用key，很多情况下强制刷新只需要forceUpdate就足够了
export function useForceUpdate() {
  const [key, forceUpdate] = useReducer((x) => x + 1, 0)
  return { forceUpdate, key }
}
