import { useSelector, useDispatch } from '../shared/hooks/useStore'

import { fetchItemList as fetchItemListAction } from './catalog.slice'

export function useItemList(length?: number) {
  const dispatch = useDispatch()
  const fetchItemList = () => dispatch(fetchItemListAction())
  const fullItemList = useSelector((state) => state.catalog.itemList)
  const currentItemList = fullItemList?.slice(0, length && Math.abs(length))

  return [currentItemList, fetchItemList] as const
}
