import React, { FC, MouseEventHandler, ReactElement } from 'react'
import cn from 'classnames'

import styles from './button.module.scss'

export interface ButtonProps {
  hidden?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement> | VoidFunction
  className?: string
  children?: ReactElement | string
}

export const Button: FC<ButtonProps> = ({
  hidden,
  onClick,
  className,
  children
}) => (
  <button
    hidden={hidden}
    onClick={onClick}
    className={cn(styles.button, className)}
  >
    {children}
  </button>
)
