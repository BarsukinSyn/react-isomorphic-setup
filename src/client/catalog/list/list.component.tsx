import React, { FC } from 'react'
import cn from 'classnames'

import styles from './list.module.scss'

export interface Link {
  name: string
  path: string
}

export interface ListProps {
  linkList?: Link[]
  className?: string
}

export const List: FC<ListProps> = ({ linkList = [], className }) => (
  <ol className={cn(styles.list, className)}>
    {linkList.map(({ path, name }) => (
      <li key={path} className={styles.listItem}>
        <a href='#' className={styles.link}>
          {name}
        </a>
      </li>
    ))}
  </ol>
)
