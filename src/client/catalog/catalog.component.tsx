import React, { FC } from 'react'

import styles from './catalog.module.scss'

interface CatalogItem {
  index: string
  name: string
}

export interface CatalogProps {
  hidden?: boolean
  itemList?: CatalogItem[]
  onActionButtonClick?: VoidFunction
}

export const Catalog: FC<CatalogProps> = ({
  hidden,
  itemList = [],
  onActionButtonClick
}) => (
  <section>
    <ol className={styles.list}>
      {itemList.map(({ index, name }) => (
        <li key={index} className={styles.listItem}>
          {name}
        </li>
      ))}
    </ol>
    <button
      hidden={!hidden}
      onClick={onActionButtonClick}
      className={styles.button}
    >
      Not enough for you?
    </button>
  </section>
)
