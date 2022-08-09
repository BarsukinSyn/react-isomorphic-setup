import React, { FC } from 'react'

import { useSelector, useDispatch } from '../hooks/useStore'

import { Catalog } from './catalog.component'
import { fetchList } from './catalog.slice'

export const CatalogContainer: FC = () => {
  const dispatch = useDispatch()
  const itemList = useSelector((state) => state.catalog.itemList)

  if (!itemList.length) throw dispatch(fetchList())

  return <Catalog itemList={itemList} />
}
