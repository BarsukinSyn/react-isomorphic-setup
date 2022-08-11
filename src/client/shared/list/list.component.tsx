import React, { FC, ReactElement } from 'react'
import cn from 'classnames'

import styles from './list.module.scss'

type ListTag = 'ol' | 'ul'

export interface ListProps {
  tag?: ListTag
  className?: string
  children: ReactElement | ReactElement[]
}

export const List: FC<ListProps> = ({
  tag: ListTag = 'ol',
  className,
  children
}) => (
  <ListTag className={cn(styles.list, className)}>
    {React.Children.map(children, (listItem) =>
      React.cloneElement(listItem, {
        className: cn(styles.listItem, listItem.props.className)
      })
    )}
  </ListTag>
)
