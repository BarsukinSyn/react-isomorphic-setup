import React, { FC } from 'react'

import styles from './catalog.module.scss'

interface CatalogItem {
  id: string
  text: string
}

export interface CatalogProps {
  itemList: CatalogItem[]
}

export const Catalog: FC<CatalogProps> = ({ itemList }) => (
  <ol className={styles.list}>
    {itemList.map(({ id, text }) => (
      <li key={id} className={styles.listItem}>
        {text}
      </li>
    ))}
  </ol>
)
