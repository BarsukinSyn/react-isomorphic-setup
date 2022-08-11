import React, { FC } from 'react'

import { useToggle } from '../shared/hooks/useToggle'

import { Catalog } from './catalog.component'
import { useItemList } from './catalog.hooks'

export const CatalogContainer: FC = () => {
  const [itemListLimit, toggleItemListLimit] = useToggle(10, undefined)
  const [itemList, fetchItemList] = useItemList(itemListLimit)

  if (!itemList) throw fetchItemList()

  return (
    <Catalog
      itemList={itemList}
      hideActionButton={!itemListLimit}
      onActionButtonClick={toggleItemListLimit}
    />
  )
}
