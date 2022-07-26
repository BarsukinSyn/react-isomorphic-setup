import React, { FC, Suspense, lazy } from 'react'

import styles from './catalog.module.scss'
import './list/list.module.scss' // avoid flickering effect

const List = lazy(() => import('./list'))

export const Catalog: FC = () => (
  <main className={styles.catalog}>
    <h1 className={styles.title}>
      Welcome to the world of
      <br />
      Dungeons and Dragons
    </h1>
    <h3 className={styles.subtitle}>We have spells...</h3>
    <Suspense fallback={<p>Flipping through an old book...</p>}>
      <List />
    </Suspense>
  </main>
)
