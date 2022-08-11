import React, { FC } from 'react'

import { List } from '../shared/list'
import { Button } from '../shared/button'

import styles from './catalog.module.scss'

interface CatalogItem {
  index: string
  name: string
}

export interface CatalogProps {
  itemList?: CatalogItem[]
  hideActionButton?: boolean
  onActionButtonClick?: VoidFunction
}

export const Catalog: FC<CatalogProps> = ({
  itemList = [],
  hideActionButton,
  onActionButtonClick
}) => (
  <section>
    <List>
      {itemList.map(({ index, name }) => (
        <li key={index}>{name}</li>
      ))}
    </List>
    <Button
      hidden={hideActionButton}
      onClick={onActionButtonClick}
      className={styles.button}
    >
      Not enough for you?
    </Button>
  </section>
)
