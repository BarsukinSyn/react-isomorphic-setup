import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { SafariHack } from '../safari-hack'

import styles from './layout.module.scss'

export const Layout: FC = () => (
  <main className={styles.catalog}>
    <h1 className={styles.title}>
      Welcome to the world of
      <br />
      Dungeons and Dragons
    </h1>
    <h3 className={styles.subtitle}>We have spells if you have coin</h3>
    <Outlet />
    <SafariHack />
  </main>
)
