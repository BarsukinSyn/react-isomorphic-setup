import { useState } from 'react'

export function useToggle<L, R>(left: L, right: R) {
  const [toggle, setToggle] = useState(true)
  const currentValue = toggle ? left : right
  const toggleValue = () => setToggle((toggle) => !toggle)

  return [currentValue, toggleValue] as const
}
