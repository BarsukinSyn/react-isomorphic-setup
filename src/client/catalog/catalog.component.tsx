import React, { FC, Suspense, lazy } from 'react'

import { SafariHack } from './safari-hack'

import styles from './catalog.module.scss'
import './list/list.module.scss' // avoid flickering effect

const List = lazy(() => import('./list'))

export interface CatalogProps {
  subtitle: string
}

export const Catalog: FC<CatalogProps> = ({ subtitle }) => (
  <main className={styles.catalog}>
    <h1 className={styles.title}>
      Welcome to the world of
      <br />
      Dungeons and Dragons
    </h1>
    <h3 className={styles.subtitle}>{subtitle}</h3>
    <Suspense fallback={<p>Flipping through an old book...</p>}>
      <List />
    </Suspense>
    <SafariHack />
  </main>
)
